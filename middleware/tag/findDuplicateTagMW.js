/*
 * find if the new tag would be a duplicate in the database
 */

const requireOption = require("../common/requireOption");

module.exports = function (objRepo) {
  const TagModel = requireOption(objRepo, "TagModel");
  return function (req, res, next) {
    TagModel.find({ name: req.body.tag.replace(/ /g, "") }, (err, tags) => {
      if (tags.length != 0) {
        res.redirect("back");
      } else {
        next();
      }
    });
  };
};
