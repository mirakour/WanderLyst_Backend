import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client from '../db/client.js';
import {} from '../db/queries/users.js'

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Helper function to generate access & refresh tokens
const generateTokens = (user) => {
  const accessToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  const refreshToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

// POST /auth/register
router.post('/register', async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const existingUser = await client.query(`SELECT * FROM users WHERE email = $1`, [email]);    

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 5);    

    const user = await client.query(
      `INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING id, email, name`,
      [email, name, hashedPassword]
    );

    const { accessToken, refreshToken } = generateTokens(user);

    res.status(201).json({ user, accessToken, refreshToken }, "user created");
  } catch (err) {
    console.error('❌ Error registering user:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// POST /auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const { rows: [user] } = await client.query(`SELECT * FROM users WHERE email = $1`, [email]);

    if (!user) return res.status(401).json({ error: 'Invalid email or password' });
    console.log(user)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ error: 'Invalid emaill or password' });

    const { accessToken, refreshToken } = generateTokens(user);

    res.json({
      user: { id: user.id, name: user.name, email: user.email },
      accessToken,
      refreshToken
    });
  } catch (err) {
    console.error('❌ Error logging in:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// POST /auth/logout
router.post('/logout', (req, res) => {
  // In stateless JWT systems, logout is handled client-side
  res.status(200).json({ message: 'Logged out. Please remove token on client.' });
});

// POST /auth/refresh
router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(401).json({ error: 'Refresh token missing' });

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET);
    const newAccessToken = jwt.sign({ id: decoded.id }, JWT_SECRET, { expiresIn: '15m' });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error('❌ Invalid refresh token:', err);
    res.status(401).json({ error: 'Invalid or expired refresh token' });
  }
});

export default router;