let express = require("express");
let router = express.Router();
let responseHandler = require("../util/responseHandler").Response;
let Location = require("../models/Location");

router.get("/get-all-locations", (req, res, next) => {
  Location.find({ isActive: true }, (err, data) => {
    let msg = !err ? "all events" : "something went wrong";
    res.locals.responseObj = {
      err: err,
      data: data,
      msg: msg
    };
    next();
  });
});

module.exports = router;
