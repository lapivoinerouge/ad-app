const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');

exports.register = async (req, res) => {
  try {
    const { username, password, phoneNumber } = req.body;
    const avatar = req.file;

    const fileType = avatar ? await getImageFileType(avatar) : 'unknown';
    const acceptedFileType = ['image/png', 'image/jpg', 'image/jpeg'].includes(fileType);
    console.log(fileType)

    if (username && typeof username === 'string' && password && typeof password === 'string' && avatar && acceptedFileType) {
      const existingUser = await User.findOne({ username: { $eq: username} });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists'})
      }
      const user = await User.create({ username, password: await bcryptjs.hash(password, 10), avatar: avatar.filename, phoneNumber });
      res.status(201).json({ message: `User created: ${user.username}` })
    } else {
      res.status(400).json({ message: 'Bad request'});
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username && typeof username === 'string' && password && typeof password === 'string') {
      const user = await User.findOne({ username: { $eq: username} });
      if (!user) {
        res.status(400).json({ message: 'Login or password is incorrect'});
      } else {
        if (bcryptjs.compareSync(password, user.password)) {
          req.session.user = { id: user._id, username: user.username };
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
  req.session.destroy((err) => {
    res.redirect('/');
  }
)}

exports.getUser = async (req, res) => {
  if (req.session.user.username ) {
    res.status(200).json({ username: req.session.user.username })
  } else {
    res.status(401).json({ message: 'You are not authorized' });
  }
}