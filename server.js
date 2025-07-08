import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import db from './db/client.js';

const PORT = process.env.PORT ?? 3000;

const startServer = async () => {
  try {
    await db.connect();
    console.log('🌐 Connected to the database');

    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
  }
};

startServer();