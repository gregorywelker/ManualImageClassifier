const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static("static"));
app.use(express.static("uploads"));

app.use(
  session({
    secret: "veryverysecret",
  })
);

require("./route/index")(app);

app.listen(30000, function () {
  console.log("Server running on port: 30000");
});
