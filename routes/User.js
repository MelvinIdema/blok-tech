import express from 'express';
import UserController from '../app/controllers/UserController.js';
import authenticateToken from '../app/middlewares/authenticateToken.js';

const UserRouter = express.Router();

UserRouter.get('/login', UserController.login);
UserRouter.post('/login', UserController.login);

UserRouter.get('/logout', authenticateToken, UserController.logout);

UserRouter.get('/register', UserController.register);
UserRouter.post('/register', UserController.register);

UserRouter.get('/account', authenticateToken, UserController.update);
UserRouter.post('/account', authenticateToken, UserController.update);

UserRouter.get('/password-forget', UserController.forgetPassword);
UserRouter.post('/password-forget', UserController.forgetPassword);

UserRouter.get('/profile/:id', UserController.show);

export default UserRouter;
