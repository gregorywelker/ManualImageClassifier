const schema = require("mongoose").Schema;
const db = require("../config/db");

const Image = db.model("Image", {
  imageID: Number,
  imageName: String,
  rects: [
    {
      _label: {
        type: schema.Types.String,
        ref: "Tag",
      },
      startX: Number,
      startY: Number,
      width: Number,
      height: Number,
    },
  ],
});

module.exports = Image;
