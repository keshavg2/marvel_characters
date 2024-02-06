import express from 'express';
import { signup, login } from '../controllers/authController';
import { searchCharacters } from "../controllers/marvelController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";

export const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);

authRouter.get('/search', GlobalMiddleWare.authenticateToken, searchCharacters);

