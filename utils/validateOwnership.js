const Ad = require('../models/ad.model');

const validateOwnership = async (req, res, next) => {
  const adId = req.params.id;
  const userId = req.session.user.id;

  const ad = await Ad.findById(adId);
  const authorId = ad.author.toString();

  if ( authorId === userId ) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
}

module.exports = validateOwnership;