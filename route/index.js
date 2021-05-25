const authMW = require("../middleware/common/authMW");
const renderMW = require("../middleware/common/renderMW");

const deleteImageMW = require("../middleware/image/deleteImageMW");
const getImageMW = require("../middleware/image/getImageMW");
const storeImageMW = require("../middleware/image/storeImageMW");
const updateImageMW = require("../middleware/image/updateImageMW");
const imageListJSONMW = require("../middleware/image/imageListJSONMW");

const addTagMW = require("../middleware/tag/addTagMW");
const deleteTagMW = require("../middleware/tag/deleteTagMW");
const getTagListMW = require("../middleware/tag/getTagListMW");
const findDuplicateTagMW = require("../middleware/tag/findDuplicateTagMW");

const loginMW = require("../middleware/account/loginMW");
const logoutMW = require("../middleware/account/logoutMW");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    req.body.imageID = Date.now();
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const ImageModel = require("../models/image");
const TagModel = require("../models/tag");
const { render } = require("ejs");
const findDuplicateMW = require("../middleware/tag/findDuplicateTagMW");

module.exports = function (app) {
  const objRepo = {
    ImageModel: ImageModel,
    TagModel: TagModel,
  }; //Repository for object models

  app.get(
    //Deletes the image with the given imageid
    "/image/delete/:imageid",
    authMW(objRepo),
    getImageMW(objRepo),
    deleteImageMW(objRepo)
  );
  app.use(
    //Loads an image from the database for reclassification
    "/image/edit/:imageid",
    authMW(objRepo),
    getImageMW(objRepo),
    getTagListMW(objRepo),
    renderMW(objRepo, "classify")
  );

  app.use(
    //Updating an existing image
    "/image/update",
    authMW(objRepo),
    updateImageMW(objRepo),
    getTagListMW(objRepo),
    renderMW(objRepo, "classify")
  );
  app.use(
    //Returns JSON data for images
    "/image/getjson",
    authMW(objRepo),
    imageListJSONMW(objRepo)
  );
  app.use(
    //Stores a newly classified image if there is data or opens the classify panel
    "/image/new",
    authMW(objRepo),
    upload.single("classifiedImage"),
    storeImageMW(objRepo),
    getTagListMW(objRepo),
    renderMW(objRepo, "classify")
  );
  app.use(
    //Lists all the images and tags for the main page
    "/image",
    authMW(objRepo),
    getTagListMW(objRepo),
    renderMW(objRepo, "list")
  );
  app.use(
    //Adds a new tag to the list
    "/tag/new",
    authMW(objRepo),
    findDuplicateTagMW(objRepo),
    addTagMW(objRepo)
  );
  app.use(
    //Removes a tag from the list by it`s name
    "/tag/delete",
    authMW(objRepo),
    deleteTagMW(objRepo)
  );

  app.use(
    //Logs the user out
    "/logout",
    logoutMW(objRepo),
    renderMW(objRepo, "index")
  );

  app.use(
    //Index page, if the user is logged in then redirects to the image list, otherwise prompts the user to log in
    "/",
    loginMW(objRepo),
    renderMW(objRepo, "index")
  );
};
