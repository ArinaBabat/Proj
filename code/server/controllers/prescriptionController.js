const {Prescriptions} = require('../models/models')
const ApiError = require('../error/ApiError');
class PrescriptionController {
  async create(req, res) {

  }
  async getAll(req, res) {
    const speciality = await Specialties.findAll()
    return res.json(speciality)
  }
  async getOne(req, res) {

  }
}
module.exports = new PrescriptionController()
