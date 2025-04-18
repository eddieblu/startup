const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

const authCookieName = 'token';

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the applications static content
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// POST /api/auth/register -- Register a new user
apiRouter.post('/auth/register', async (req, res) => {
    if (await findUser('username', req.body.username)) {
        res.status(409).send({ msg: 'User exists' });
    } else {
        const user = await registerUser(req.body.username, req.body.password);

        setAuthCookie(res, user.token);
        res.send({ username: user.username });
    }
});

// POST /api/auth/login -- Login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('username', req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            await DB.updateUser(user);
            setAuthCookie(res, user.token);
            res.send({ username: user.username });
            return;
        }
    }
    res.status(401).send({ msg: 'Invalid username or password' });
});

// DELETE /api/auth/logout -- Logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
        DB.updateUser(user);
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

// POST /api/posts -- Create a post and add to posts
apiRouter.post('/posts', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);

    // Increment streak
    await DB.incrementUserStreak(user.username);

    // Create new post
    const newPost = {
        id: uuid.v4(),
        username: user.username,
        content: req.body.content || '',
        hearts: 0,
        heartedBy: [],
    };

    await DB.addPost(newPost);
    realtime.broadcast({ type: 'new-post', post: newPost });

    return res.status(201).json(newPost);
});

// GET /api/posts -- Get all posts (feed)
apiRouter.get('/posts', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);

    const posts = await DB.getAllPosts(user.username);

    // TODO: change this to grab from database instead (should work without manually setting w DB)
    const postsHearted = posts.map((post) => {
        return {
            ...post,
            isHeartedByCurrentUser: post.heartedBy.includes(user.username),
        };
    });
    return res.json(postsHearted);
});

// GET /api/posts/user/:username -- Get a specific post by username, with user's streak included
apiRouter.get('/posts/user/:username', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    const userPost = await DB.getPostByUsername(req.params.username);

    if (!userPost) {
        return res.json({
            id: null,
            content: '',
            hearts: 0,
            heartedBy: [],
            isHeartedByCurrentUser: false,
            streak: user.streak
        });
    }

    const postAndStreak = {
        ...userPost,
        isHeartedByCurrentUser: userPost.heartedBy.includes(user.username),
        streak: user.streak,
    }
    return res.json(postAndStreak);
});

// PATCH /api/posts/:id/content -- Update a post's content
apiRouter.patch('/posts/:id/content', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);

    const post = await DB.getPostById(req.params.id);
    if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
    };

    if (post.username !== user.username) {
        return res.status(403).json({ msg: 'Forbidden: not the post owner' });
    }

    if (req.body.content !== undefined) {
        await DB.updatePostContent(req.params.id, req.body.content);
    };

    const updatedPost = await DB.getPostById(req.params.id);

    realtime.broadcast({ type: 'edit-post', post: updatedPost });

    return res.json(updatedPost);
});

// PATCH /api/posts/:id/heart
apiRouter.patch('/posts/:id/heart', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);

    const post = await DB.getPostById(req.params.id);
    if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
    }

    await DB.toggleHeart(req.params.id, user.username);

    const updatedPost = await DB.getPostById(req.params.id);

    realtime.broadcast({ type: 'heart', post: updatedPost });

    return res.json({
        ...updatedPost,
        isHeartedByCurrentUser: updatedPost.heartedBy.includes(user.username),
    });
});

// Default error handler
app.use(function (err, _req, res, _next) {
    res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

async function findUser(field, value) {
    if (!value) return null;

    if (field === 'token') {
        return DB.getUserByToken(value);
    }
    return DB.getUser(value);
}

async function registerUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
        streak: 0,
    };
    await DB.addUser(user);

    return user;
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

function scheduleDailyDelete() {
    const now = new Date();

    const nextMidnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // tomorrow
        0, // 0 hours
        0, // 0 minutes
        0  // 0 seconds
    );
    const msUntilMidnight = nextMidnight - now;

    setTimeout(async () => {
        await DB.deleteAllPosts();

        scheduleDailyDelete();
    }, msUntilMidnight);
}

const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    scheduleDailyDelete();
});

const realtime = peerProxy(httpService);