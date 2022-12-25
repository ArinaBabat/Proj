const {Users} = require('../models/models')
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')

class UserController {
async check(req, res, next) {
  if (req.user.tab){
      const tabl = req.user.tab
      return (tabl)
    }
    return(false)
  }
}
  module.exports = new UserController()
