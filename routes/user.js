import express from 'express';
import userControllers from '../controllers/user.js';
import verifyToken from '../middleware/verifyToken.js';

const userRoutes = express.Router();


userRoutes.post('/register', userControllers.register);
userRoutes.post('/login', userControllers.login);


// Em routes/user.js
userRoutes.get('/profile', verifyToken, userControllers.getProfile);
userRoutes.put('/update', verifyToken, userControllers.updateProfile);
userRoutes.put('/change-password', verifyToken, userControllers.changePassword);



userRoutes.post('/logout', userControllers.logout);

export default userRoutes;
