let express = require("express");
let router = express.Router();
let Event = require("../models/Event");
let generateEventId = require("../util/utils").GenerateEventId;

router.post("/create-event", (req, res, next) => {
  console.log(req.body, req.params);

  let event = new Event({
    // eventId: generateEventId(req.body),
    name: req.body.name,
    locations: req.body.locations,
    createdBy: req.body.createdBy,
    category: req.body.category,
    parts: req.body.parts,
    nominations: req.body.nominations
  });
  event.save((err, data) => {
    res.locals.responseObj = {
      err: err,
      data: data,
      msg: "create event"
    };
    next();
  });
});

router.get("/get-events/:quarter/:year", (req, res, next) => {
  const sessionId = req.headers.sessionid;
  console.log(sessionId);
  console.log(req.sessionID, req.session.id);
  const year = req.params.year;
  const quarter = req.params.quarter;
  let gte = null;
  let lt = null;
  switch (quarter) {
    case "Q1":
      gte = new Date(year, 0, 1, 0, 0, 0, 0);
      lt = new Date(year, 2, 31, 23, 59, 59, 0);
      break;
    case "Q2":
      gte = new Date(year, 3, 1, 0, 0, 0, 0);
      lt = new Date(year, 5, 30, 23, 59, 59, 0);
      break;
    case "Q3":
      gte = new Date(year, 6, 1, 0, 0, 0, 0);
      lt = new Date(year, 8, 31, 23, 59, 59, 0);
      break;
    case "Q4":
      gte = new Date(year, 9, 1, 0, 0, 0, 0);
      lt = new Date(year, 11, 31, 23, 59, 59, 0);
      break;
    default:
      gte = new Date(year, 0, 1, 0, 0, 0, 0);
      lt = new Date(year, 11, 31, 23, 59, 59, 0);
  }
  let query = {
    $and: [
      {
        "parts.start": { $gte: new Date(gte) }
      },
      {
        "parts.end": { $lt: new Date(lt) }
      }
    ]
  };
  Event.find(query)
    .populate("author", "name")
    .populate("parts.trainer", "name")
    .exec((err, data) => {
      res.locals.responseObj = {
        err: err,
        data: data,
        msg: "all events"
      };
      next();
    });
});

router.put("/update-event-by-id/:id", (req, res, next) => {
  let dataToUpdate = {
    name: req.body.name,
    locations: req.body.locations,
    createdBy: req.body.createdBy,
    category: req.body.category,
    parts: req.body.parts,
    nominations: req.body.nominations,
    isPublished: req.body.isPublished,
    isMultiSession: req.body.isMultiSession,
    nominations: req.body.nominations,
    updatedAt: new Date()
  };

  Event.findOneAndUpdate(
    req.params.id,
    { $set: dataToUpdate },
    { new: false },
    (err, data) => {
      let msg = !err ? "Event is updated successfully" : "something went wrong";
      res.locals.responseObj = {
        err: err,
        data: data,
        msg: msg
      };
      next();
    }
  );
});

router.delete("/delete-event-by-id/:id", (req, res, next) => {
  Event.findOneAndUpdate(
    req.params.id,
    { $set: { isActive: false } },
    { new: false },
    (err, data) => {
      let msg = !err ? "Event is deleted successfully" : "something went wrong";
      res.locals.responseObj = {
        err: null,
        data: null,
        msg: msg
      };
      next();
    }
  );
});

router.get("/get-event-by-id/:id", (req, res, next) => {
  Event.findById(req.params.id)
    .populate("author", "name")
    .populate("parts.trainer", "name")
    .exec((err, data) => {
      res.locals.responseObj = {
        err: err,
        data: data,
        msg: "event data"
      };
      next();
    });
});

module.exports = router;
