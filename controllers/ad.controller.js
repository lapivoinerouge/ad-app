const Ad = require('../models/ad.model');
const fs = require('fs');
const { validateStringParam, validateImage } = require('../utils/validateRequestParams');

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
    const data = await Ad.find({$text: { $search: req.params.searchPhrase }}).populate('author');
    res.json(data); 
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
}

exports.post = async (req, res) => {
  try {
    const { title, content, price, location } = req.body;
    const user = req.session.user;
    const image = req.file;

    if (validateStringParam(title) && validateStringParam(content) && validateStringParam(location) && price && user && validateImage(image)) {
      const published = Date.now();
      let newAd;
      if (image) {
        newAd = new Ad({ title, content, published, image: image.filename, price, location, author: user.id });
      } else {
        newAd = new Ad({ title: title, content: content, published: published, price: price, location: location, author: user.id });
      }
      await newAd.save();
      res.status(200).json({ message: 'OK' });
    } else {
      if (image) {
        fs.unlinkSync(image.path);
      }
      res.status(400).json({ message: 'Bad request' });
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
}

exports.put = async (req, res) => {
  const { title, content, price, location } = req.body;
  const user = req.session.user;
  const image = req.file;

  try {
    if (validateStringParam(title) && validateStringParam(content) && validateStringParam(location) && price && user && validateImage(image)) {
      const existingAd = await Ad.findById(req.params.id);

      if (!existingAd) {
        fs.unlinkSync(image.path);
        return res.status(404).json({ message: 'Not found '});
      }
      
      if (image) {
        await Ad.updateOne({ _id: req.params.id, author: user.id }, { $set: { title, content, image: image.filename, price, location }});
        fs.unlinkSync(`public/uploads/${existingAd.image}`);
      } else {
        await Ad.updateOne({ _id: req.params.id, author: user.id }, { $set: { title, content, price, location }});
      }
      res.status(200).json({ message: 'OK' });
    } else {
      fs.unlinkSync(image.path);
      res.status(400).json({ message: 'Bad request' });
    } 
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.delete = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);

    if(ad) {
      if (ad.image) {
        fs.unlinkSync(`public/uploads/${ad.image}`);
      }
      await Ad.deleteOne({ _id: req.params.id });
      res.status(204).json(ad);
    }
    else res.status(404).json({ message: 'Not found' });
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
}