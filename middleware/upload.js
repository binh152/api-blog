const multer = require("multer");
const path = require("path");

// upload file
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      console.log("not support");
      cb(null, false);
    }
  },
  limits: {
    fieldSize: 1024 * 1024 * 2,
  },
});
module.exports= upload
