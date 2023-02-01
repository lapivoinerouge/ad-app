const multer = require('multer');

const maxSize = 5 * 1000 * 1000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads')
  },
  filename: (req, file, cb) => {
    const [name, ext] = file.originalname.split('.');
    cb(null, `${name}-${Date.now()}.${ext}`);
  }
})

const imageUpload = multer({ storage, limits: { fileSize: maxSize } });

module.exports = imageUpload;