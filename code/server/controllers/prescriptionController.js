const {Prescriptions} = require('../models/models')
const ApiError = require('../error/ApiError');
class PrescriptionController {
    async create(req, res, next) {
      try {
        const {diagnostic, therapy, recordRecordId} = req.body
        const candidate = await Prescriptions.findOne({where: {recordRecordId}})
        if (candidate) {
            return next(ApiError.badRequest('Заключение по этому приёму уже существует'))
        }
        const prescription = await Prescriptions.create({diagnostic, therapy, recordRecordId})
        return res.json(prescription)
      } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
  async getAll(req, res) {
    const prescription = await Prescriptions.findAll();
    return res.json(prescription)
  }
  async getOne(req, res) {
    const { id } = req.params;
    const prescription = await Prescriptions.findOne({ where: { prescription_id: id } });
    return res.json(prescription);
  }
}
module.exports = new PrescriptionController()
