/*
 * Getting JSON data for images and rects
 */
const requireOption = require("../common/requireOption");

module.exports = function (objRepo) {
  const ImageModel = requireOption(objRepo, "ImageModel");
  return function (req, res, next) {
    ImageModel.find({}, (err, images) => {
      if (err) {
        console.log("Error:", err);
        res.status(404);
      }
      console.log("JSON data response");
      res.send(JSON.stringify(images));
    });
  };
};
