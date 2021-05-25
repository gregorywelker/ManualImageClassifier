const schema = require("mongoose").Schema;
const db = require("../config/db");

const Tag = db.model("Tag", {
  name: String,
});

module.exports = Tag;
