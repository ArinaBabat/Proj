const {Cabinets} = require('../models/models')
const ApiError = require('../error/ApiError');

class CabinetController {
  async create(req, res, next) {
    try {
      const {number, specialitySpecialityId} = req.body
      const cabinet = await Cabinets.create({number, specialitySpecialityId})
      return res.json(cabinet)
    } catch (e) {
          next(ApiError.badRequest(e.message))
      }
  }
  async getAll(req, res) {
    const cabinet = await Cabinets.findAll()
    return res.json(cabinet)
  }
  async delet(req, res) {

  }
}
module.exports = new CabinetController()
