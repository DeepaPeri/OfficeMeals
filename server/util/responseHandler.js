let handler = {
  Response: (req, res) => {
    if (typeof res.locals.responseObj.status !== "undefined") {
      res.status(res.locals.responseObj.status);
    }
    res.json(res.locals.responseObj);
  }
};

module.exports = handler;
