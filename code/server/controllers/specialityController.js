const {Specialties} = require('../models/models')
const ApiError = require('../error/ApiError');
class SpecialityController {
  async create(req, res, next) {
    try {
      const {name} = req.body
      const candidate = await Specialties.findOne({where: {name}})
      if (candidate) {
          return next(ApiError.badRequest('Такая специальность уже существует'))
      }
      const speciality = await Specialties.create({name})
      return res.json(speciality)
    } catch (e) {
          next(ApiError.badRequest(e.message))
      }
  }
  async getAll(req, res) {
    const speciality = await Specialties.findAll()
    return res.json(speciality)
  }
  async delet(req, res) {

  }
}
module.exports = new SpecialityController()
