const path = require("path"),
  fs = require("fs"),
  Captcha = require("@haileybot/captcha-generator");

  let captcha = new Captcha();
exports.capthaGenerator = async(req, res) => {
try {
  // captcha.PNGStream.pipe(fs.createWriteStream(path.join(__dirname, './images', `${Date.now()}.png`)));
  captcha = new Captcha();
  // console.log(captcha.value)
  res.json({message: captcha.dataURL})
} catch (error) {
  console.log(error)
}
}

exports.capthaValidation = async(req, res, next) =>{
  try {
    if (captcha.value === req.body.captha){
      next()
    }else{
      res.json({message: "Captha Invalid"})
    }
  } catch (error) {
    console.log(error)
  }
}

// captcha.PNGStream.pipe(fs.createWriteStream(path.join(__dirname, `${captcha.value}.png`)));
// captcha.JPEGStream.pipe(fs.createWriteStream(path.join(__dirname, `${captcha.value}.jpeg`)));
// console.log(captcha.dataURL)

