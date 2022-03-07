const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.vpj2j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

module.exports.addUser = async function (user) {
  const userObject = {
    email: user.email,
    password: user.password,
  };
  try {
    await client.connect();
    const result = await createUser(client, userObject);
    console.log('User created with ID: ', result.insertedId);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

module.exports.listUsers = async function () {
  try {
    await client.connect();
    const result = await listUsers(client);
    const array = await result.toArray();
    return array.map((user) => ({ email: user.email }));
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

module.exports.findUser = async function (email) {
  try {
    await client.connect();
    const result = await findUser(client, email);
    if (!result) return false;
    return {
      email: result.email,
      password: result.password,
    };
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

async function createUser(client, user) {
  return await client.db('matching-app').collection('users').insertOne(user);
}

async function findUser(client, email) {
  return await client
    .db('matching-app')
    .collection('users')
    .findOne({ email: email });
}

async function listUsers(client) {
  return await client.db('matching-app').collection('users').find({});
}
