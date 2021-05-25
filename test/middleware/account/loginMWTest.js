let expect = require("chai").expect;
let loginMW = require("../../../middleware/account/loginMW");

describe("loginMW middleware test", function () {
  it("The login should be succesful and redirected to /image, also session should be set up", function (done) {
    let objRepo = {};
    req = {
      body: { email: "test@email.com", password: "testpass" },
      session: {
        //session save is called when the login is succesful, after save, redirect is called in the callback
        save(cb) {
          expect(this.loggedin).is.true;
          cb();
        },
      },
    };
    res = {
      //redirect is being called after succesful login, and takes us to the /image page
      redirect(targetPage) {
        expect(targetPage).to.eql("/image");
        done();
      },
    };
    //next is not used here so the callback is null
    loginMW(objRepo)(req, res, null);
  });

  it("The user is logged in but visits an unknown url on the website", function (done) {
    let objRepo = {};
    req = {
      body: {},
      session: {
        loggedin: true,
      },
    };
    res = {
      render(targetPage) {
        expect(targetPage).to.eql("nosuchpage");
        done();
      },
    };
    //next is not used here so the callback is null
    loginMW(objRepo)(req, res, null);
  });

  it("No one is logged in and loads the site, next should be called", function (done) {
    let objRepo = {};
    req = {
      body: {},
      session: {},
    };
    //next should be reached here
    loginMW(objRepo)(req, res, (err) => {
      expect(err).to.eql(undefined);
      done();
    });
  });
});
