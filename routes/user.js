import express from 'express';
import userControllers from '../controllers/user.js';

const userRoutes = express.Router();

userRoutes.post('/register', userControllers.register),
userRoutes.post('/login', userControllers.login),
userRoutes.post('/logout', userControllers.logout);





export default userRoutes;
