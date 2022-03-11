import User from '../models/User.js';
import Log from '../services/Log.js';
import fetch from 'node-fetch';
import dogNames from 'dog-names';

async function show(req, res) {
  const user = await User.getByEmail(req.session.email);
  let dogs = [];

  try {
    const dogsApi = await fetch('https://dog.ceo/api/breeds/image/random/5');
    const dogImages = await dogsApi.json();
    dogs = dogImages.message.map((dog) => ({
      img: dog,
      name: dogNames.allRandom(),
    }));
  } catch (err) {
    Log(err);
  }

  res.render('index', {
    user: {
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    },
    dogs: dogs,
  });
}

export default {
  show,
};
