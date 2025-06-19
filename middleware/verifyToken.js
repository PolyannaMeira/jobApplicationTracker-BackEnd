import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = { id: decoded.id, email: decoded.email }; 
    next();
  } catch (err) {
    console.error('Invalid token:', err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default verifyToken;
