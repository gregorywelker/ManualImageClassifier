/*
 * Delete an existing tag from the database by name
 */

const requireOption = require("../common/requireOption");

module.exports = function (objRepo) {
  return function (req, res, next) {
    if (req.body.tag !== undefined && req.body.tag != "") {
      const TagModel = requireOption(objRepo, "TagModel");
      TagModel.deleteOne({ name: req.body.tag }, (err) => {
        if (err) {
          next(err);
        }
        res.redirect("back");
      });
    }
  };
};
