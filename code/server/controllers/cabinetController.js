const {Cabinets} = require('../models/models')
const ApiError = require('../error/ApiError');

class CabinetController {
  
  async create(req, res, next) { // deprecated
    try {
      const {number, specialitySpecialityId} = req.body
      const cabinet = await Cabinets.create({number, specialitySpecialityId})
      return res.json(cabinet)
    } catch (e) {
          next(ApiError.badRequest(e.message))
      }
  }
  async getAll(req, res) {
    let {specialitySpecialityId, limit, page} = req.query
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit
    let cabinet;
    if (!specialitySpecialityId) {
      cabinet = await Cabinets.findAndCountAll({limit, offset})
    }
    if (specialitySpecialityId) {
      cabinet = await Cabinets.findAndCountAll({where:{specialitySpecialityId}, limit, offset})
    }
    return res.json(cabinet)
  }
  async delet(req, res) { // deprecated

  }
}
module.exports = new CabinetController()
