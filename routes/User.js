import crypto from 'crypto';
import path from 'path';
import express from 'express';
import multer from 'multer';

import UserController from '../app/controllers/UserController.js';
import authenticated from '../app/middlewares/authenticated.js';

// https://github.com/expressjs/multer/issues/170#issuecomment-123402678
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    crypto.randomBytes(16, function (err, raw) {
      if (err) return cb(err);

      cb(null, raw.toString('hex') + path.extname(file.originalname));
    });
  },
});
const upload = multer({ storage: storage });

const UserRouter = express.Router();

UserRouter.get('/login', UserController.login);
UserRouter.post('/login', UserController.login);

UserRouter.get('/logout', authenticated, UserController.logout);

UserRouter.get('/register', UserController.register);
UserRouter.post('/register', upload.array('avatar'), UserController.register);

UserRouter.get('/settings', authenticated, UserController.update);
UserRouter.post('/settings', authenticated, UserController.update);

UserRouter.get('/password-forget', UserController.forgetPassword);
UserRouter.post('/password-forget', UserController.forgetPassword);

UserRouter.get('/profile/:id', UserController.show);

export default UserRouter;
