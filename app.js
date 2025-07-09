import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import favoriteRoutes from './routes/favorites.js';
import taskRoutes from './routes/tasks.js';
import voteRoutes from './routes/votes.js';
import commentsRouter from './routes/comments.js';
import votesRoutes from './routes/votes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// Routes
app.use('/api', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/comments', commentsRouter);
app.use('/api/votes', votesRoutes);

// Health check
app.get('/', (req, res) => {
  console.log('GET / route hit');
  res.send('🌍 WanderLyst API is live!');
});

export default app;