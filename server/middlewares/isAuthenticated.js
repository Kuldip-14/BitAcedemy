// middlewares/isAuthenticated.js
import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
  try {
    // 1. Check for Bearer token in Authorization header
    const authHeader = req.headers.authorization;
    let token = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    // 2. Fallback: check HTTP-only cookie
    if (!token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        message: 'User not authenticated',
        success: false,
      });
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.id = decoded.userId;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({
      message: 'Invalid or expired token',
      success: false,
    });
  }
};

export default isAuthenticated;
