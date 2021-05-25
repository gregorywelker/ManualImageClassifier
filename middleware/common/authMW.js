/*
 * Check if user is authenticated, if not then redirect to login
 */

const requireOption = require("../common/requireOption");

module.exports = function (objRepo) {
  return function (req, res, next) {
    if (
      typeof req.session.loggedin === "undefined" ||
      req.session.loggedin !== true
    ) {
      console.log("Auth error");
      res.render("index");
    }
    next();
  };
};
