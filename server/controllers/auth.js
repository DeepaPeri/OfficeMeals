let express = require("express");

let router = express.Router();
let User = require("../models/User");

router.post("/google-login", (req, res, next) => {
  const profile = req.body;
  /**
     * email: "devesh.singhal@accoliteindia.com"
     familyName: "Singhal"
     givenName: "Devesh"
     googleId: "117325899339878257142"
     imageUrl: "https://lh5.googleusercontent.com/-udlSWBvG9CU/AAAAAAAAAAI/AAAAAAAAAAo/IdLGjQ4NEsU/s96-c/photo.jpg"
     name: "Devesh Singhal"
     */
  User.findOne({ email: profile.email }, (err, person) => {
    if (err) {
      res.locals.responseObj = {
        err: err,
        data: {},
        msg: "Something went Wrong!!"
      };
      next();
    } else {
      if (person) {
        req.session.user = person;
        const userForFrontEnd = {
          name: person.name,
          email: person.email
        };
        res.locals.responseObj = {
          err: err,
          data: { user: userForFrontEnd, sessionID: req.sessionID },
          msg: "Login Successful"
        };
        next();
      } else {
        let user = new User({
          name: {
            familyName: profile.familyName,
            givenName: profile.givenName
          },
          isActive: true,
          email: profile.email,
          imageUrl: profile.imageUrl,
          roles: ["employee"]
        });
        user.save((err, person) => {
          if (!err && person) {
            req.session.user = person;
            const userForFrontEnd = {
              name: person.name,
              email: person.email
            };
            res.locals.responseObj = {
              err: null,
              data: { user: userForFrontEnd, sessionID: req.sessionID },
              msg: "Login Successful"
            };
            next();
          } else {
            res.locals.responseObj = {
              err: err,
              data: null,
              msg: "Login Failed"
            };
            next();
          }
        });
      }
    }
  });
});

router.get("/google-logout", (req, res, next) => {
  req.session.destroy(err => {
    res.locals.responseObj = {
      err: null,
      data: null,
      msg: "Logout Successful"
    };
    next();
  });
});

router.get("/getCurrentSession", (req, res, next) => {
  let sessionObj = { user: null };
  if (req.session && req.session.user) {
    sessionObj.user = {
      id: req.session.user._id,
      email: req.session.user.email,
      imageUrl: req.session.user.imageUrl,
      name: req.session.user.providerData,
      role: req.session.user.isAdmin ? "admin" : "user"
    };
  }
  res.locals.responseObj = sessionObj;
  next();
});

router.get("/checkSession", (req, res, next) => {
  res.locals.responseObj = { session: !!(req.session && req.session.user) };
  next();
});

module.exports = router;
