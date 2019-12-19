const multer = require('multer');

const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/images');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "_" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true)
  } else {
      //reject file
      cb({message: 'Unsupported file format'}, false)
  }
}

const upload = multer({
  storage: Storage,
  fileFilter: fileFilter
})

module.exports = upload;