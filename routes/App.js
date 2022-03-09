import express from 'express';
import AppController from '../app/controllers/AppController.js';
import authenticateToken from '../app/middlewares/authenticateToken.js';

const AppRouter = express.Router();

AppRouter.get('/', authenticateToken, AppController.show);

export default AppRouter;
