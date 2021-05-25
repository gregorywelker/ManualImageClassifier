/*
 * Find an image in the database then delete it
 */
const fs = require("fs");
const requireOption = require("../common/requireOption");

module.exports = function (objRepo) {
  return function (req, res, next) {
    if (req.params.imageid !== undefined && req.params.imageid != "") {
      const ImageModel = requireOption(objRepo, "ImageModel");
      ImageModel.deleteOne({ imageID: req.params.imageid }, (err) => {
        if (err) {
          console.log("Error:", err);
        }
        if (res.locals.singleImageData !== undefined) {
          fs.unlink(
            "./uploads/" + res.locals.singleImageData.imageName,
            (err) => {
              if (err) {
                console.log("Error:", err);
              }
              res.redirect("back");
            }
          );
        }
      });
    } else {
      res.redirect("back");
    }
  };
};
