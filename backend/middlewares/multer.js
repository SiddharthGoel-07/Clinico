import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/"); // or any folder you want
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname); // add timestamp to avoid duplicates
  },
});

const upload = multer({ storage });

export default upload;
