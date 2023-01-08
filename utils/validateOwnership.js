const Ad = require('../models/ad.model');

const validateOwnership = async (req, res, next) => {
  const adId = req.params.id;
  const userId = req.session.user.id;

  const ad = Ad.findById(adId);

  if ( ad.author === req.session.user ) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
}

module.exports = validateOwnership;