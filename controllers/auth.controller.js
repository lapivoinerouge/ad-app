const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const fs = require('fs');

const getImageFileType = require('../utils/getImageFileType');

const validateStringParam = (param) => {
  return param !== null && typeof param === 'string' && param.length > 0;
}

exports.register = async (req, res) => {
  try {
    const { username, password, phoneNumber } = req.body;
    const avatar = req.file;

    const fileType = avatar ? await getImageFileType(avatar) : 'unknown';
    const acceptedFileType = ['image/png', 'image/jpg', 'image/jpeg'].includes(fileType);

    if (validateStringParam(username) && validateStringParam(password) && avatar && acceptedFileType) {
      const existingUser = await User.findOne({ username: { $eq: username} });
      if (existingUser) {
        fs.unlinkSync(avatar.path);
        return res.status(409).json({ message: 'User already exists'})
      }
      const user = await User.create({ username, password: await bcryptjs.hash(password, 10), avatar: avatar.filename, phoneNumber });
      res.status(201).json({ message: `User created: ${user.username}` })
    } else {
      if (avatar) fs.unlinkSync(avatar.path);
      res.status(400).json({ message: 'Bad request'});
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (validateStringParam(username) && validateStringParam(password)) {
      const user = await User.findOne({ username: { $eq: username} });
      if (!user) {
        res.status(400).json({ message: 'Login or password is incorrect'});
      } else {
        if (bcryptjs.compareSync(password, user.password)) {
          req.session.user = { id: user._id, username: user.username };
          req.session.save();
          res.status(200).json({ message: 'Login successful'});
        } else {
          res.status(400).json({ message: 'Login or password is incorrect'});
        }
      }
    } else {
      res.status(400).json({ message: 'Bad request'});
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.logout = async (req, res) => {
  try {
    console.log('Logging out....');
    req.session.destroy();
    res.status(204).send(); 
  } catch (err) {
    console.log('Can\'t log out!')
    res.status(500).json({ message: err });
  }
}

exports.getUser = async (req, res) => {
  if (req.session.user.username) {
    const username = req.session.user.username;
    const user = await User.findOne({ username: { $eq: username} });
    res.status(200).json({ username: user.username, phoneNumber: user.phoneNumber, avatar: user.avatar });
  }
}