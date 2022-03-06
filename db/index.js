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
