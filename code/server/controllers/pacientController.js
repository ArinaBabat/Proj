const {Pacients} = require('../models/models')
const ApiError = require('../error/ApiError');

class PacientController {
  async registration(req, res) {

  }
  async login(req, res) {

  }
  async check(req, res, next) {
        const token = generateJwt(req.pacient.pacient_id)
        return res.json({token})
    }
}
module.exports = new PacientController()
