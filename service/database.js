const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('users');
const postCollection = db.collection('posts');

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
    await userCollection.updateOne({ username: user.username }, { $set: user });
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

function getPostByUsername(username) {
    return postCollection.findOne({ username: username });
}

async function updatePostContent(postId, newContent) {
    await postCollection.updateOne(
        { id: postId },
        { $set: { content: newContent } }
    );
}

async function toggleHeart(postId, username) {
    const post = await postCollection.findOne({ id: postId });
    if (!post) return;

    const isHearted = post.heartedBy.includes(username);
    if (!isHearted) {
        await postCollection.updateOne(
            { id: postId },
            {
                $addToSet: { heartedBy: username },
                $inc: { hearts: 1 }
            }
        );
    } else {
        await postCollection.updateOne(
            { id: postId, heartedBy: username },
            {
                $pull: { heartedBy: username },
                $inc: { hearts: -1 }
            }
        );
    }
}

async function deleteAllPosts() {
    const result = await postCollection.deleteMany({});
    console.log(`Deleted ${result.deletedCount} posts at ${new Date().toLocaleString()}`);
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
    getPostByUsername,
    updatePostContent,
    toggleHeart,
    deleteAllPosts
}