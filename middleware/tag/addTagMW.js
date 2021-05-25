/*
 * Add a new tag to the database
 */

const requireOption = require("../common/requireOption");

module.exports = function (objRepo) {
  return function (req, res, next) {
    if (req.body.tag !== undefined && req.body.tag != "") {
      const TagModel = requireOption(objRepo, "TagModel");

      let newTag = new TagModel();

      newTag.name = req.body.tag.replace(/ /g, "");
      newTag.save((err) => {
        if (err) {
          next(err);
        }
        res.redirect("back");
      });
    }
  };
};
