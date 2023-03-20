const {Prescriptions} = require('../models/models')
const ApiError = require('../error/ApiError');
class PrescriptionController {
    async create(req, res, next) {
      try {
        const { diagnostic, therapy, record_id } = req.body
        const candidate = await Prescriptions.findOne({where: {record_id}})
        if (candidate) {
            return next(ApiError.badRequest('Заключение по этому приёму уже существует'))
        }
        const prescription = await Prescriptions.create({diagnostic, therapy, record_id})
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
    const prescription = await Prescriptions.findOne({ where: { record_id: id } });
    return res.json(prescription);
  }
}
module.exports = new PrescriptionController()
