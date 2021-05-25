/*
 * Logout the user
 */

const requireOption = require("../common/requireOption");

module.exports = function (objRepo) {
  return function (req, res, next) {
    req.session.destroy((err) => {
      console.log("Logged out");
      next();
    });
  };
};
