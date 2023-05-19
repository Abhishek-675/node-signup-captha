const { Router } = require("express");
const fs = require("fs");
const Image = require("../models/Image")
const upload = require("../middleware/upload")

const routes = Router();

// routes.post('/upload', upload.single('images'), async (req, res) => {
routes.post('/upload', upload.array('image', 5), async (req, res) => {
  // Get an array of all uploaded files
  const files = req.files;
  // console.log(files)

  for (const file of files) {
    const { filename, path } = file;

    // Create new Image instance with filename and filepath
    const image = await Image.create({
      filename,
      filepath: path
    });

    // console.log(image.toJSON());
  }

  res.json({message:'Images uploaded successfully'});
});

routes.get('/images', async(req, res)=>{
  const images = await Image.findAll({attributes:["filename"]});
  // console.log(images)
  res.json({images,message:"Images Retrived Successfully"})
})


module.exports = routes;
