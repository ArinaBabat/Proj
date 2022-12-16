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
    const doctor = await Doctors.findAll()
    return res.json(doctor)
  }
  async getOne(req, res) {

  }
}
module.exports = new DoctorController()
