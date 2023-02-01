const mongoose = require('mongoose');

mongoose.set("strictQuery", true);

let dbURI;
if (process.env.NODE_ENV === 'production') {
  dbURI = `mongodb+srv://admin:${process.env.MONGO_ATLAS_PASSWORD}@vcluster.wacbnbq.mongodb.net/?retryWrites=true&w=majority`;
} else if (process.env.NODE_ENV === 'test') {
  // TODO: add config for tests
} else {
  dbURI = 'mongodb://localhost:27017/adApp';
}

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', async () => {
  console.log('Connected to the database');
});

db.on('error', err => console.log('Error ' + err));