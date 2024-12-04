import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import { env } from '../config/env';

const router = Router();
const apiVersion = env.API_VERSION;

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', version: apiVersion });
});

// API routes
router.use(`/${apiVersion}/auth`, authRoutes);
router.use(`/${apiVersion}/users`, userRoutes);

export default router; 