import express from 'express';
import cors from "cors";

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import favoriteRoutes from './routes/favorites.js';
import taskRoutes from './routes/tasks.js';
import tripRoutes from  './routes/trips.js'
import voteRoutes from './routes/votes.js';
import commentRouter from './routes/comments.js';


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/trip', tripRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/comments', commentRouter);

// Health check
app.get('/', (req, res) => {
  console.log('GET / route hit');
  res.send('🌍 WanderLyst API is live!');
});

export default app;