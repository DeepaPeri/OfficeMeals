const Event = require('../models/Event')
const User = require('../models/User')
const times = require('async').times

let Utils = {
  GenerateEventId: body => {
    let startDate = new Date(body.tentativeDates.startDate)
    let eventUID =
      body.eventShortCode + (startDate.getMonth() + 1) + startDate.getDate()
    return eventUID
  },
  GenerateSlug: str => {
    str = str.replace(/^\s+|\s+$/g, '') // trim
    str = str.toLowerCase()

    // remove accents, swap ñ for n, etc
    let from = 'åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;'
    let to = 'aaaaaaeeeeiiiioooouuuunc------'

    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
    }

    str = str
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-') // collapse dashes
      .replace(/^-+/, '') // trim - from start of text
      .replace(/-+$/, '') // trim - from end of text

    return str
  },
  GenerateEventSlug: (eventName, cb, count = 0, slug = '') => {
    if (!count) {
      slug = Utils.GenerateSlug(eventName)
    }

    let queryString = count > 0 ? `${slug}-${count}` : slug
    Event.find({ slug: queryString }, (err, data) => {
      console.log(data)
      if (!err) {
        if (data.length) {
          Utils.GenerateEventSlug(eventName, cb, ++count, slug)
        } else {
          cb(queryString)
        }
      } else {
        // need to handle
      }
    })
  },
  userEmailtoIdHandler: (emailArr, cb) => {
    if (emailArr.length > 0) {
      times(emailArr.length, (n, nextNominee) => {
        if(typeof emailArr[n] !== 'undefined' && emailArr[n] != null && emailArr[n] !== 'blank') {
          User.findOne({ email: emailArr[n] }, (err, user) => {
            if (!err) {
              if (user) {
                nextNominee(null, user._id)
              } else {
                let newUser = new User({
                  name: {
                    familyName: '',
                    givenName: ''
                  },
                  email: emailArr[n],
                  isRegistered: false
                })
                newUser.save((err, newAddedUser) => {
                  if (!err && newAddedUser) {
                    nextNominee(null, newAddedUser._id)
                  } else {
                    nextNominee(err, null)
                  }
                })
              }
            } else {
              nextNominee(err, null)
            }
          })
        } else {
          nextNominee('null', '')
        }
      }, (err, nomineeArr) => {
        cb(err, nomineeArr)
      })
    } else {
      cb(null, [])
    }

  }
}

module.exports = Utils
