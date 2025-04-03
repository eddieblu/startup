const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('simon');
const userCollection = db.collection('user');
const postCollection = db.collection('post');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    try {
        await db.command({ ping: 1 });
        console.log(`Connect to database`);
    } catch (ex) {
        console.log(`Unable to connect to database with ${url} because ${ex.message}`);
        process.exit(1);
    }
})();

function getUser(username) {
    return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function addUser(user) {
    await userCollection.insertOne(user);
}

async function updateUser(user) {
    await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function incrementUserStreak(username) {
    await userCollection.updateOne(
        { username: username },
        { $inc: { streak: 1 } }
    );
}

async function addPost(post) {
    await postCollection.insertOne(post);
}

async function getAllPosts(username) {
    const userPost = await postCollection.findOne({ username: username });

    const otherPosts = await postCollection
        .find({ username: { $ne: username } })
        .toArray();

    if (!userPost) {
        return otherPosts;
    }
    return [userPost, ...otherPosts];
}

function getPostById(postId) {
    return postCollection.findOne({ id: postId });
}

async function updatePostContent(postId, newContent) {
    await postCollection.updateOne(
        { id: postId },
        { $set: { content: newContent } }
    );
}

async function toggleHeart(postId, username) {
    // If user not in heartedBy, add them:
    await postCollection.updateOne(
        { id: postId },
        {
            $addToSet: { heartedBy: username },
            $inc: { hearts: 1 }
        }
    );
    // If user already in heartedBy, remove them:
    await postCollection.updateOne(
        { id: postId },
        {
            $pull: { heartedBy: username },
            $inc: { hearts: -1 }
        }
    );
}

module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    incrementUserStreak,
    addPost,
    getAllPosts,
    getPostById,
    updatePostContent,
    toggleHeart
}