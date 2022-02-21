const _ = require('lodash');

const randomNumbers = _.times(10, () => Math.round(Math.random() * 100));
console.log(randomNumbers);
