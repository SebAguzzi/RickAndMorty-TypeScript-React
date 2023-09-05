import express from 'express';
import { register, login, users } from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/', users);


export default authRouter;
