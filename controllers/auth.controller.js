const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { username, password, avatar, phoneNumber } = req.body;
    if (username && typeof username === 'string' && password && typeof password === 'string') {
      const existingUser = await User.findOne({ username: { $eq: username} });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists'})
      }
      const user = await User.create({ username, password: await bcryptjs.hash(password, 10), avatar, phoneNumber });
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
    const { username, password, avatar, phoneNumber } = req.body;
    if (username && typeof username === 'string' && password && typeof password === 'string') {
      const user = await User.findOne({ username: { $eq: username} });
      if (!user) {
        res.status(400).json({ message: 'Login or password is incorrect'});
      } else {
        if (bcryptjs.compareSync(password, user.password)) {
          req.session.username = user.username;
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

exports.getUser = async (req, res) => {
  if (req.session.username ) {
    res.status(200).json({ username: req.session.username })
  } else {
    res.status(401).json({ message: 'You are not authorized' });
  }
}