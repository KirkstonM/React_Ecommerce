import express from 'express';
import { getUser, login, register } from '../Controls/userControl.js';
import { verifyToken } from '../middleware/userMiddleware.js';

const router = express.Router();
http://localhost:3001/register
router.post('/register', register );
http://localhost:3001/login
router.post('/login', login);

router.get('/user/:id', verifyToken, getUser);

export default router;