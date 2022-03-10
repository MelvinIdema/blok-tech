import express from 'express';
import AppController from '../app/controllers/AppController.js';
import authenticated from '../app/middlewares/authenticated.js';

const AppRouter = express.Router();

AppRouter.get('/', authenticated, AppController.show);

export default AppRouter;
