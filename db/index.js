const fs = require('fs');

module.exports.addUser = function (user) {
  fs.readFile('db/db.json', (err, data) => {
    if (err) throw err;
    const parsed = JSON.parse(data.toString());
    parsed.push(user);
    return fs.writeFile('db/db.json', JSON.stringify(parsed), {}, (err) => {
      if (err) throw err;
    });
  });
};

module.exports.listUsers = async function () {
  try {
    const users = await fs.readFileSync('db/db.json');
    return JSON.parse(users.toString()).map((user) => ({ email: user.email }));
  } catch (err) {
    console.error(err);
  }
};

module.exports.findUser = async function (email) {
  try {
    const users = await fs.readFileSync('db/db.json');
    const parsed = JSON.parse(users.toString());
    const user = parsed.find((user) => user.email === email);
    if (!user) return false;
    return {
      email: user.email,
      password: user.password,
    };
  } catch (err) {
    console.error(err);
  }
};
