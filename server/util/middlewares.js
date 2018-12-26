const acl = require('../config/acl').aclLookup;

let middlewares = {
  isLoggedIn: (req, res, next) => {
    if (req.session && typeof req.session.user !== "undefined") {
      next();
    } else {
      res.status(401);
      res.json({
        err: null,
        data: null,
        msg: "You are not authorized to access"
      });
    }
  },
  isAdmin: (req, res, next) => {
    if (
      req.session &&
      typeof req.session.user !== "undefined" &&
      req.session.user.isAdmin
    ) {
      next();
    } else {
      res.status(401);
      res.json({
        err: null,
        data: null,
        msg: "You are not authorized to access"
      });
    }
  },
  aclLookup: (req, res, next) => {
    let urlArr = req.originalUrl;
    urlArr = urlArr.split('/');
    if(acl(urlArr[2], urlArr[3], req.session.user.roles)) {
      next();
    } else {
      res.status(401);
      res.json({
        err: null,
        data: null,
        msg: "You are not authorized to access this url"
      });
    }

  }
};

module.exports = middlewares;
