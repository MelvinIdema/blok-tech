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
      avatar:
        'data:image/jpeg;base64,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',
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
