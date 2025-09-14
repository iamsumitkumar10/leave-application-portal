const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function(req, res, next){
  const authHeader = req.header('Authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if(!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    req.user = await User.findById(decoded.id).select('-password');
    if(!req.user) return res.status(401).json({ message: 'Invalid token: user not found' });
    next();
  } catch(err){
    console.error(err);
    return res.status(401).json({ message: 'Token is not valid' });
  }
}
