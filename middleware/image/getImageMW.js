/*
 * Get a single image from the database and return it to the user
 * This function is used in the reclassification process
 */

const requireOption = require("../common/requireOption");

module.exports = function (objRepo) {
  return function (req, res, next) {
    if (req.params.imageid !== undefined && req.params.imageid !== "") {
      const ImageModel = requireOption(objRepo, "ImageModel");
      ImageModel.findOne({ imageID: req.params.imageid }, (err, image) => {
        if (err) {
          next(err);
        }
        res.locals.singleImageData = image;
        next();
      });
    } else {
      next();
    }
  };
};
