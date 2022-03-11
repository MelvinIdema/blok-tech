import Log from '../services/Log.js';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URL;
const client = new MongoClient(uri);

const assign = (user) =>
  Object.assign(
    {
      created_at: Date.now(),
      email: '',
      name: 'Unknown',
      avatar: 'jan-paparazzi-hyves.jpeg',
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
      avatar: result.avatar,
      password: result.password,
    });
  } catch (err) {
    Log(err);
  } finally {
    await client.close();
  }
}

async function getAll(limit = 99) {
  try {
    await client.connect();
    const result = await client
      .db('matching-app')
      .collection('users')
      .find({})
      .limit(limit);
    const array = await result.toArray();
    return array.map((result) =>
      assign({
        _id: result._id,
        created_at: result.created_at,
        email: result.email,
        name: result.name,
        avatar: result.avatar,
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
    avatar: user.avatar,
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

async function update(email, data) {
  try {
    await client.connect();
    return await client
      .db('matching-app')
      .collection('users')
      .updateOne(
        { email: email },
        {
          $set: data,
          $currentDate: { lastModified: true },
        }
      );
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
