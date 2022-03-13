import Log from '../services/Log.js';
import fetch from 'node-fetch';
import dogNames from 'dog-names';

async function show(req, res) {
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
    dogs: dogs,
  });
}

export default {
  show,
};
