const {Doctors} = require('../models/models')
const ApiError = require('../error/ApiError');

class DoctorController {
  async create(req, res, next) {
    try {
      const {first_name, last_name, password, specialitySpecialityId} = req.body
      const doctor = await Doctors.create({first_name, last_name, password, specialitySpecialityId})
      return res.json(doctor)
    } catch (e) {
          next(ApiError.badRequest(e.message))
      }
  }
  async login(req, res) {

  }
  async check(req, res) {

  }
  async getAll(req, res) {
    let {specialitySpecialityId, limit, page} = req.query
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit
    let doctors;
    if (!specialitySpecialityId) {
      doctors = await Doctors.findAndCountAll({limit, offset})
    }
    if (specialitySpecialityId) {
      doctors = await Doctors.findAndCountAll({where:{specialitySpecialityId}, limit, offset})
    }
    return res.json(doctors)
  }
  async getOne(req, res) {

  }
}
module.exports = new DoctorController()
