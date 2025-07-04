import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api', authRoutes);
app.use('/api/user', userRoutes);

// Health check
app.get('/', (req, res) => {
  console.log('GET / route hit');
  res.send('🌍 WanderLyst API is live!');
});

export default app;