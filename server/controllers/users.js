let express = require('express')
let router = express.Router()
let User = require('../models/User')

router.get('/get-all-employees', (req, res, next) => {
  User
    .find()
    .exec(function (err, users) {
      res.locals.responseObj = {
        err: err,
        data: users,
        msg: 'All Employees'
      }
      next()
    })
});

router.get('/get-my-roles', (req, res, next) => {
  User.findById(req.session.user._id)
    .exec(function (err, user) {
      let responseObj
      if (!err) {
        responseObj = {
          roles: user.roles,
        }
      }
      res.locals.responseObj = {
        err: err,
        data: responseObj,
        msg: 'users roles'
      };
      next()
    })
});

router.get('/get-my-profile', (req, res, next) => {
  User.findById(req.session.user._id)
    .exec(function (err, user) {
      let responseObj
      if (!err) {
        responseObj = {
          name: user.displayName,
          email: user.email,
          image: user.imageUrl
        }
      }
      res.locals.responseObj = {
        err: err,
        data: responseObj,
        msg: 'users profile'
      }
      next()
    })
})

module.exports = router