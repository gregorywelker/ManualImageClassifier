let expect = require("chai").expect;
let imageListJSONMW = require("../../../middleware/image/imageListJSONMW");

describe("imageListJSONMW middleware test", function () {
  it("Should return the images stored in the database", function (done) {
    let req = {};
    let res = {};

    //This is being called from the middleware, this is where we are getting back the image daat
    res.send = function (jsonData) {
      expect(JSON.parse(jsonData)).to.eql(["testimagedata"]);
      done();
    };

    imageListJSONMW({
      ImageModel: {
        find: function (data, cb) {
          cb(undefined, ["testimagedata"]);
        },
      },
    })(req, res, undefined);
  });

  it("Should return an error while trying to get the image data from the database", function (done) {
    let req = {};
    let res = {
      //This is being called from the middleware, this is where we are getting back the error information
      status(errorCode) {
        expect(errorCode).to.eql(404);
      },
      //This is being called from the middleware, this is where we are getting back the undefined image data
      send(jsonData) {
        expect(jsonData).to.eql(undefined);
        done();
      },
    };

    imageListJSONMW({
      ImageModel: {
        find: function (data, cb) {
          cb("error", undefined);
        },
      },
    })(req, res, undefined);
  });
});
