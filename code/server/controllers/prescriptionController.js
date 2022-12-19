const {Prescriptions} = require('../models/models')
const ApiError = require('../error/ApiError');
class PrescriptionController {
    async create(req, res, next) {
      try {
        const {diagnostic, therapy, recordRecordId} = req.body
        const prescription = await Prescriptions.create({diagnostic, therapy, recordRecordId})
        return res.json(prescription)
      } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
  async getAll(req, res) {
    const speciality = await Prescriptions.findAll()
    return res.json(prescription)
  }
  async getOne(req, res) {

  }
}
module.exports = new PrescriptionController()
