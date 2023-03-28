const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'Test';
const userCollection = 'Users';

const getUserByUsername = async (username) => {
    const client = await MongoClient.connect(uri);

    console.log("getUserByUsername: " + username);

    try {
        const db = client.db(dbName);
        const collection = db.collection(userCollection);

        var query = {username: username};

        var results = await collection.find(query).toArray();

        console.log('getUserByUsername: results');
        console.log(results);

        return results[0];
    } catch(err) {
        console.log('getUserByUsername: Something bad happened');
        console.log(err);
    } finally {
        client.close();
    }
}

const updateUser = async (id, username, password, email, qa1, qa2, qa3) => {
    const client = await MongoClient.connect(uri);

    try {
        const db = client.db(dbName);
        const collection = db.collection(userCollection);

        var query = { _id: new ObjectId(id)};

        var update = {
            $set: {
                username: username,
                password: password,
                email: email,
                answer1: qa1,
                answer2: qa2,
                answer3: qa3
            }
        };

        var results = await collection.updateOne(query, update);

        console.log('updateUser: results');
        console.log(results);

        return results;
    } catch(err) {
        console.log('updateUser: something went wrong');
        console.log(err);
    } finally {
        client.close();
    }
}

const createUser = async (username, password, email, age, qa1, qa2, qa3) => {
    const client = await MongoClient.connect(uri);

    try {
        const db = client.db(dbName);
        const collection = db.collection(userCollection);

        var newUser = {
            username: username,
            password: password,
            email: email,
            age: age,
            answer1: qa1,
            answer2: qa2,
            answer3: qa3,
            isAdmin: false
        };

        const results = await collection.insertOne(newUser);

        console.log('createUser: results');
        console.log(results);

        return results;
    } catch(err) {
        console.log('createUser: something went wrong');
        console.log(err);
    } finally {
        client.close();
    }
}

const getAllUsers = async () => {
    const client = await MongoClient.connect(uri);

    try {
        const db = client.db(dbName);
        const collection = db.collection(userCollection);

        var query = {};

        var results = await collection.find(query).toArray();

        return results;
    } catch (err) {
        console.log("getAllUsers: Something bad happened");
        console.log(err);
    } finally {
        client.close();
    }
}

const deleteUser = async (username) => {
    const client = await MongoClient.connect(uri);

    try {
        const db = client.db(dbName);
        const collection = db.collection(userCollection);

        var query = { username: username }

        var results = await collection.deleteOne(query);

        return;
    } catch (err) {
        console.log("Something went wrong");
        console.log(err);
    } finally {
        client.close();
    }
}

const makeUserAdmin = async (username) => {
    const client = await MongoClient.connect(uri);

    try {
        const db = client.db(dbName);
        const collection = db.collection(userCollection);

        var query = { username: username };

        var update = {
            $set: {
                isAdmin: true
            }
        };

        var results = await collection.updateOne(query, update);

        console.log('makeUserAdmin: results');
        console.log(results);

        return results;
    } catch(err) {
        console.log('makeUserAdmin: something went wrong');
        console.log(err);
    } finally {
        client.close();
    }
}

exports.getUserByUsername = getUserByUsername;
exports.updateUser = updateUser;
exports.createUser = createUser;
exports.getAllUsers = getAllUsers;
exports.deleteUser = deleteUser;
exports.makeUserAdmin = makeUserAdmin;