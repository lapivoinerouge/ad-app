const mongoose = require('mongoose');

const connectToDB = () => {
  
  mongoose.set("strictQuery", true);

  mongoose.connect('mongodb://localhost:27017/adApp', { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;

  db.once('open', async () => {
    console.log('Connected to the database');
  });
  db.on('error', err => console.log('Error ' + err));
}

module.exports = connectToDB;