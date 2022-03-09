import 'dotenv/config';

import express from 'express';
import mustacheExpress from 'mustache-express';
import cookieParser from 'cookie-parser';

import AppRouter from './routes/App.js';
import UserRouter from './routes/User.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.engine('mustache', mustacheExpress('views/partials/', '.mustache'));
app.set('view engine', 'mustache');
app.set('views', 'views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/', AppRouter);
app.use('/user', UserRouter);

app.get('*', (req, res) => {
  res.status(404);
  res.render('404', {
    alert: {
      title: '404 not found',
      body: 'This page has not been found. Sorry!',
    },
  });
});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));