import express from 'express';
import UserController from '../app/controllers/UserController.js';
import authenticated from '../app/middlewares/authenticated.js';

const UserRouter = express.Router();

UserRouter.get('/login', UserController.login);
UserRouter.post('/login', UserController.login);

UserRouter.get('/logout', authenticated, UserController.logout);

UserRouter.get('/register', UserController.register);
UserRouter.post('/register', UserController.register);

UserRouter.get('/account', authenticated, UserController.update);
UserRouter.post('/account', authenticated, UserController.update);

UserRouter.get('/password-forget', UserController.forgetPassword);
UserRouter.post('/password-forget', UserController.forgetPassword);

UserRouter.get('/profile/:id', UserController.show);

export default UserRouter;
