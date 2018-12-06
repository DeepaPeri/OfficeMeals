const accessList = {
  "/api/events/create-event": [],
  "/api/events/get-events": [],
  "/api/events/get-event-by-id": [],
  "/api/users/get-all-employees": []
};

let middlewares = {
  isLoggedIn: (req, res, next) => {
    if (req.session && typeof req.session.user !== "undefined") {
      next();
    } else {
      res.sendStatus(401);
      res.end();
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
      res.sendStatus(401);
      res.end();
    }
  },
  aclLookup: (req, res, next) => {
    console.log(req);
    next();
  }
};

module.exports = middlewares;
