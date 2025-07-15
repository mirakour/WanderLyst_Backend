import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const requireUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log(req.user)
    next();
  } catch (err) {
    console.error('❌ Invalid token:', err);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export default requireUser;


