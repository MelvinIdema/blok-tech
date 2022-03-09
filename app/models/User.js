import Log from '../services/Log.js';
import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.vpj2j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

const assign = (user) =>
  Object.assign(
    {
      _id: '',
      created_at: Date.now(),
      email: '',
      name: 'Unknown',
      password: '',
    },
    user
  );

async function getByEmail(email) {
  try {
    await client.connect();
    const result = await client
      .db('matching-app')
      .collection('users')
      .findOne({ email: email });
    if (!result) return undefined;
    return assign({
      _id: result._id,
      created_at: result.created_at,
      email: result.email,
      name: result.name,
      password: result.password,
    });
  } catch (err) {
    Log(err);
  } finally {
    await client.close();
  }
}

async function getAll() {
  try {
    await client.connect();
    const result = await client.db('matching-app').collection('users').find({});
    const array = await result.toArray();
    return array.map((result) =>
      assign({
        _id: result._id,
        created_at: result.created_at,
        email: result.email,
        name: result.name,
      })
    );
  } catch (err) {
    Log(err);
  } finally {
    await client.close();
  }
}

async function create(user) {
  // Construct user
  const userObject = assign({
    created_at: Date.now(),
    email: user.email,
    password: user.password,
    name: user.name,
  });

  // Add to database
  try {
    await client.connect();
    const result = await client
      .db('matching-app')
      .collection('users')
      .insertOne(userObject);
    return result.insertedId;
  } catch (err) {
    Log(err);
  } finally {
    await client.close();
  }
}

async function update(id, data) {
  try {
    await client.connect();
    return await client
      .db('matching-app')
      .collection('users')
      .updateOne({ _id: id }, data);
  } catch (err) {
    Log(err);
  } finally {
    await client.close();
  }
}

async function remove(id) {
  try {
    await client.connect();
    return await client
      .db('matching-app')
      .collection('users')
      .deleteOne({ _id: id });
  } catch (err) {
    Log(err);
  } finally {
    await client.close();
  }
}

export default {
  assign,
  create,
  getByEmail,
  getAll,
  update,
  remove,
};
