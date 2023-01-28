const Ad = require('../models/ad.model');
const fs = require('fs');
const getImageFileType = require('../utils/getImageFileType');

const validateStringParam = (param) => {
  return param !== null && typeof param === 'string' && param.length > 0;
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
    const data = await Ad.find({$text: { $search: req.params.searchPhrase }}).populate('author');
    res.json(data); 
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
    console.log('LOL')

    const fileType = image ? await getImageFileType(image) : 'unknown';
    const acceptedFileType = ['image/png', 'image/jpg', 'image/jpeg'].includes(fileType);

    if (validateStringParam(title) && validateStringParam(content) && validateStringParam(location) && price && user && acceptedFileType) {
      const published = Date.now();
      const ad = new Ad({ title, content, published, image: image.filename, price, location, author: user.id });
      await ad.save();
      res.status(200).json({ message: 'OK' });
    } else {
      fs.unlinkSync(image.path);
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

  let acceptedFileType = true;

  try {
    if (image) {
      const fileType = await getImageFileType(image);
      acceptedFileType = ['image/png', 'image/jpg', 'image/jpeg'].includes(fileType);
    }

    if (validateStringParam(title) && validateStringParam(content) && validateStringParam(location) && price && user && acceptedFileType) {
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
      await Ad.deleteOne({ _id: req.params.id });
      res.status(204).json(ad);
    }
    else res.status(404).json({ message: 'Not found' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}