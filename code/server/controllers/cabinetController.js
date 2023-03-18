const {Cabinets} = require('../models/models')
const ApiError = require('../error/ApiError');

class CabinetController {
  async getAll(req, res) {
    let {specialitySpecialityId} = req.query
    let cabinet;
    if (specialitySpecialityId) {
      cabinet = await Cabinets.findAndCountAll({
        where: { specialitySpecialityId },
        order: [['cabinet_id', 'ASC']],
      })
    } else {
      cabinet = await Cabinets.findAndCountAll({
        order: [['cabinet_id', 'ASC']],
      })
    }
    return res.json(cabinet)
  }
}
module.exports = new CabinetController()
