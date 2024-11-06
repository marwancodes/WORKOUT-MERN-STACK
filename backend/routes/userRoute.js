import express from 'express';
import { loginUSer, signupUser } from '../controllers/userController.js';

const router = express.Router();

// login route
router.post('/login', loginUSer);

// signup route
router.post('/signup', signupUser);

export default router;