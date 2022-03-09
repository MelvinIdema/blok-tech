import User from '../models/User.js';

async function show(req, res) {
  const user = await User.getByEmail(req.token.email);
  const allUsers = await User.getAll();

  res.render('index', {
    name: user.name,
    users: allUsers,
    dogs: [
      { name: 'diederik' },
      { name: 'jamie' },
      { name: 'johan' },
      { name: 'kieran' },
      { name: 'richard' },
    ],
    alert: {
      title: 'Under Construction',
      body: 'This site is under construction and might not work properly.',
    },
  });
}

export default {
  show,
};
