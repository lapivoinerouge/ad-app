const Ad = require('../models/ad.model');
const User = require('../models/user.model');

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
    const { title, content, published, image, price, location, author } = req.body;
    // const image = req.files.file;
    const user = await User.findById(author);
    // const user = await User.find({ username: author });
    if(!user) res.status(404).json({ message: 'You need to be logged in to post' });
    const ad = new Ad({ title, content, published, image, price, location, author: user._id });
    await ad.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.put = async (req, res) => {
  const { title, content, published, image, price, location, author } = req.body;
  // const image = req.files.file;
  const user = await User.findById(author);
  // const user = await User.find({ username: author });
  if(!user) res.status(404).json({ message: 'You need to be logged in to post' });
  try {
    await Ad.updateOne({ _id: req.params.id }, { $set: { title, content, published, image, price, location, author: user._id }});
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