const {Specialties} = require('../models/models')
const ApiError = require('../error/ApiError');
class SpecialityController {
  async create(req, res) {
    const {name} = req.body
    const speciality = await Specialties.create({name})
    return res.json(speciality)
  }
  async getAll(req, res) {
    const speciality = await Specialties.findAll()
    return res.json(speciality)
  }
  async delet(req, res) {

  }
}
module.exports = new SpecialityController()
