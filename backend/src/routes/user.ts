import { Router, Request, Response } from 'express';
import { createUser, signin } from '../controller/user';

const router = Router();

// POST endpoint to signup
router.post('/user/signup', createUser);

// POST endpoint to sign in
router.post('/user/signin', signin);

export default router;
