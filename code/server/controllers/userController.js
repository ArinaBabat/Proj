const {Users} = require('../models/models')
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')

class UserController {
async check(req, res, next) {
  try {
      const tabl = req.user.tab
      return (tabl)
    } catch (e) {
          next(ApiError.badRequest(e.message))
      }
  }
}
  module.exports = new UserController()
