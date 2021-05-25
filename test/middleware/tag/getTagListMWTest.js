let expect = require("chai").expect;
let getTagListMW = require("../../../middleware/tag/getTagListMW");

describe("getTagListMW middleware test", function () {
  it("Should return the tags stored in the database", function (done) {
    let req = {};
    let res = {
      locals: {},
    };

    getTagListMW({
      TagModel: {
        find: function (data, cb) {
          cb(undefined, ["testtag1", "testtag2"]);
        },
      },
    })(req, res, function (err) {
      expect(res.locals.tags).to.eql(["testtag1", "testtag2"]);
      expect(err).to.eql(undefined);
      done();
    });
  });

  it("Should return error while loading the tags", function (done) {
    let req = {};
    let res = {
      locals: {},
    };

    getTagListMW({
      TagModel: {
        find: function (data, cb) {
          cb("error", undefined);
        },
      },
    })(req, res, function (err) {
      expect(err).to.eql("error");
      done();
    });
  });
});
