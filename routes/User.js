import express from 'express';
import upload from '../app/services/S3.js';

import UserController from '../app/controllers/UserController.js';
import authenticated from '../app/middlewares/authenticated.js';

const UserRouter = express.Router();

UserRouter.get('/login', UserController.login);
UserRouter.post('/login', UserController.login);

UserRouter.get('/logout', authenticated, UserController.logout);

UserRouter.get('/register', UserController.register);
UserRouter.post('/register', upload.array('avatar'), UserController.register);

UserRouter.get('/settings', authenticated, UserController.update);
UserRouter.post(
  '/settings',
  upload.array('avatar'),
  authenticated,
  UserController.update
);

UserRouter.get('/password-forget', UserController.forgetPassword);
UserRouter.post('/password-forget', UserController.forgetPassword);

UserRouter.get('/profile/:id', UserController.show);

export default UserRouter;
