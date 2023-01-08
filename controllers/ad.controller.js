const Ad = require('../models/ad.model');

const validateStringParam = (param) => {
  return param && typeof param === 'string';
}

exports.getAll = async (req, res) => {
  try {
    res.json(await Ad.find().populate('author'));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await Ad.findById(req.params.id).populate('author');
    if(!data) res.status(404).json({ message: 'Not found' });
    else res.json(data);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getBySearchPhrase = async (req, res) => {
  try {
    res.json(searchPhrase = await Ad.find(req.params.searchPhrase).populate('author'));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.post = async (req, res) => {
  try {
    const { title, content, price, location } = req.body;
    const user = req.session.user;
    const image = req.file;

    const fileType = image ? await getImageFileType(image) : 'unknown';
    const acceptedFileType = ['image/png', 'image/jpg', 'image/jpeg'].includes(fileType);

    if (validateStringParam(title) && validateStringParam(content) && validateStringParam(location) && user && acceptedFileType) {
      const published = Date.now();
      const ad = new Ad({ title, content, published, image, price, location, author: user.id });
      await ad.save();
      res.json({ message: 'OK' });
    } else {
      res.status(400).json({ message: 'Bad request' });
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.put = async (req, res) => {
  const { title, content, price, location } = req.body;
  const user = req.session.user;
  const image = req.file;

  try {
    if (image) {
      await Ad.updateOne({ _id: req.params.id, author: user.id }, { $set: { title, content, image, price, location }});
    } else {
      await Ad.updateOne({ _id: req.params.id, author: user.id }, { $set: { title, content, price, location }});
    }
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.delete = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if(ad) {
      await Ad.deleteOne({ _id: req.params.id });
      res.status(204).json(ad);
    }
    else res.status(404).json({ message: 'Not found' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}