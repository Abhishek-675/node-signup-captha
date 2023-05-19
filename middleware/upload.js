const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
    //   cb(null, Date.now())
    const fileExtension = file.originalname.split(".")[1].toLocaleLowerCase()
      cb(null, Date.now().toString()+'.'+fileExtension)
    //   cb(null, Date.now() + '-' + file.originalname)
    }
  })
  
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb("Please upload only images.", false);
    }
  };
  

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5, // 5 MB
      files: 5 // Allow up to 5 files to be uploaded at once
    },
    fileFilter: multerFilter
  });

module.exports = upload;