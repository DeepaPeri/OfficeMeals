let express = require("express");

let router = express.Router();
let User = require("../models/User");
let envConfig = require("../config/env");

router.post("/google-login", (req, res, next) => {
  const profile = req.body;
  User.findOne({ email: profile.email }, (err, person) => {
    if (err) {
      res.locals.responseObj = {
        status: 500,
        err: err,
        data: {},
        msg: "Something went Wrong!!"
      };
      next();
    } else {
      if (person) {
        if (!person.isRegistered) {
          person.set({
            name: {
              familyName: profile.familyName,
              givenName: profile.givenName
            },
            isActive: true,
            isRegistered: true,
            imageUrl: profile.imageUrl,
            roles: ["employee"]
          });
          person.save((err, newPerson) => {
            req.session.user = newPerson;
            const userForFrontEnd = {
              name: newPerson.name,
              email: newPerson.email,
              roles: newPerson.roles
            };
            res.locals.responseObj = {
              status: 200,
              err: err,
              data: { user: userForFrontEnd, sessionID: req.sessionID },
              msg: "Login Successful"
            };
            next();
          });
        } else {
          req.session.user = person;
          const userForFrontEnd = {
            name: person.name,
            email: person.email,
            roles: person.roles
          };
          res.locals.responseObj = {
            status: 200,
            err: err,
            data: { user: userForFrontEnd, sessionID: req.sessionID },
            msg: "Login Successful"
          };
          next();
        }
      } else {
        let emailDomain = profile.email.split("@");
        if (envConfig.allowedDomains.indexOf(emailDomain[1]) > -1) {
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
                email: person.email,
                roles: person.roles
              };
              res.locals.responseObj = {
                status: 200,
                err: null,
                data: { user: userForFrontEnd, sessionID: req.sessionID },
                msg: "Login Successful"
              };
              next();
            } else {
              res.locals.responseObj = {
                status: 500,
                err: err,
                data: null,
                msg: "Login Failed"
              };
              next();
            }
          });
        } else {
          res.locals.responseObj = {
            status: 401,
            err: "NOT AUTHORIZED",
            data: null,
            msg: "You are not authorized to login."
          };
          next();
        }
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
