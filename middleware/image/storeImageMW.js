/*
 * Store a newly classified image with it`s classification data in the database
 */

const requireOption = require("../common/requireOption");

module.exports = function (objRepo) {
  return function (req, res, next) {
    if (req.file && req.body.rects !== undefined && req.body.rects !== "") {
      const ImageModel = requireOption(objRepo, "ImageModel");

      let newImage = new ImageModel();

      newImage.imageID = req.body.imageID;
      newImage.imageName = req.file.filename;
      let parsedImageData = JSON.parse(req.body.rects);
      for (let i = 0; i < parsedImageData.length; i++) {
        newImage.rects[i] = parsedImageData[i];
      }
      newImage.save((err) => {
        if (err) {
          console.log("Image save error:", err);
          next(err);
        }
        console.log("New image saved");
      });
    }
    next();
  };
};
