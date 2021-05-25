/*
 * Template engine data injection
 */

const requireOption = require("../common/requireOption");

module.exports = function (objRepo, viewName) {
  return function (req, res) {
    console.log("Rendering:" + viewName);
    res.render(viewName);
  };
};
