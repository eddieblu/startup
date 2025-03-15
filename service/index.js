const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');

const app = express();

const authCookieName = 'token';

// The scores and posts are saved in memory and disappear whenever the service is restarted.
let users = [];
let posts = [];

// The service port. 
// In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// POST /api/auth/register -- Register a new user
apiRouter.post('/auth/register', async (req, res) => {
    if (await findUser('username', req.body.username)) {
        res.status(409).send({ msg: 'Username already exists' });
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
    try {
        const user = await findUser('token', req.cookies[authCookieName]);
        
        // Increment streak
        user.streak += 1;

        // Create new post
        const newPost = {
            id: uuid.v4(),
            username: user.username,
            content: req.body.content || '',
            hearts: 0,
            isHeartedByCurrentUser: false,
            heartedBy: [],
        };

        posts.push(newPost);

        return res.status(201).json(newPost);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// GET /api/posts -- Get all posts (feed)
apiRouter.get('/posts', verifyAuth, (req, res) => {
    return res.status(501).json({ error: 'Not implemented yet' });
})

// GET /api/posts/:id -- Get a specific post by ID
apiRouter.get('/posts/:id', verifyAuth, (req, res) => {
    return res.status(501).json({ error: 'Not implemented yet' });
});

// PATCH /api/posts/:id/content -- Update a post's content
apiRouter.patch('/posts/:id/content', verifyAuth, async (req, res) => {
    try {
        const user = await findUser('token', req.cookies[authCookieName]);

        const post = posts.find((p) => p.id === req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        if (req.body.content !== undefined) {
            if (post.username !== user.username) {
                return res.status(403).json({ msg: 'Forbidden: not the post owner' });
            }
            post.content = req.body.content;
        }

        return res.json(post);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

// PATCH /api/posts/:id/heart
apiRouter.patch('/posts/:id/heart', verifyAuth, async (req, res) => {
    try {
        const user = await findUser('token', req.cookies[authCookieName]);

        const post = posts.find((p) => p.id === req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        const index = post.heartedBy.indexOf(user.username);
        if (index >= 0) {
            post.heartedBy.splice(index, 1);
            post.hearts -= 1;
        } else {
            post.heartedBy.push(user.username);
            post.hearts += 1;
        }

        const updatedPost = {
            ...post,
            isHeartedByCurrentUser: post.heartedBy.includes(user.username),
        }

        return res.json(updatedPost);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

// Default error handler
app.use(function (err, req, res, _next) {
    res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

// Helper function
async function findUser(field, value) {
    if (!value) return null;

    return users.find((u) => u[field] === value);
}

// Helper function
async function registerUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
        streak: 0,
    };
    users.push(user);

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

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
