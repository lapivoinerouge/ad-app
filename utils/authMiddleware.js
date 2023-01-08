const authMiddleware = (req, res, next) => {
  if (req.session.username ) {
    next();
  } else {
    res.status(401).json({ message: 'You are not authorized' });
  }
}

module.exports = authMiddleware;