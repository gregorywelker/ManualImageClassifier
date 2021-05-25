/*
 * Check if username and password is good, if so then log in, otherwise redirect to login
 */

const requireOption = require("../common/requireOption");

module.exports = function (objRepo) {
  return function (req, res, next) {
    if (req.body.email && req.body.password) {
      console.log(
        "Email and password not empty, logging in, Email: " +
          req.body.email +
          " Password: " +
          req.body.password
      );
      req.session.loggedin = true;
      console.log("Session set");
      console.log(req.session);
      return req.session.save((err) => {
        console.log("Session error:", err);
        res.redirect("/image");
      });
    } else if (
      req.session.loggedin !== undefined &&
      req.session.loggedin === true
    ) {
      //Redirect, unknown url
      res.render("nosuchpage");
    } else {
      console.log("Not logged in");
      next();
    }
  };
};
