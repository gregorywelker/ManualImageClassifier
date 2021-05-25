/*
 * Store new classification data for an already uploaded picture
 * Used for image reclassification
 */

const requireOption = require("../common/requireOption");

module.exports = function (objRepo) {
  return function (req, res, next) {
    if (
      req.body.rects !== undefined &&
      req.body.rects !== "" &&
      req.body.imageid !== undefined &&
      req.body.imageid !== ""
    ) {
      const ImageModel = requireOption(objRepo, "ImageModel");
      ImageModel.updateOne(
        { imageID: req.body.imageid },
        { rects: JSON.parse(req.body.rects) },
        (err) => {
          if (err) {
            next(err);
          }
          next();
        }
      );
    } else {
      next();
    }
  };
};
