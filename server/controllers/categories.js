let express = require("express");
let router = express.Router();
let Category = require("../models/Category");

router.get("/get-all-categories", (req, res, next) => {
  Category.find({ isActive: true }, (err, data) => {
    let msg = !err ? "all categories" : "something went wrong";
    res.locals.responseObj = {
      err: err,
      data: data,
      msg: msg
    };
    next();
  });
});

module.exports = router;
