/*
 * Get all the available tags from the database
 */

const requireOption = require("../common/requireOption");

module.exports = function (objRepo) {
  const TagModel = requireOption(objRepo, "TagModel");
  return function (req, res, next) {
    TagModel.find({}, (err, tags) => {
      if (err) {
        next(err);
      }
      res.locals.tags = tags;
      next();
    });
  };
};
