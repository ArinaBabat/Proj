const {Records, Timetable} = require('../models/models')
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');
class RecordController {
  async create(req, res, next) {
      if (!req.user) {
        ApiError.badRequest("Пользователь не авторизован");
      }
      let pacientPacientId = req.user.pacient_id;
      try {
        const {time, doctorDoctorId, timetableTimetableId} = req.body
        const timetable = (await Timetable.findOne({ where: { timetable_id: timetableTimetableId } })).dataValues;
        if (parseInt(time) < timetable.start_of_admission) {
          return next(ApiError.badRequest("Неправильное время"));
        }
        if (parseInt(time) + 15 > timetable.end_of_reception) {
          return next(ApiError.badRequest("Неправильное время"));
        }
        if (parseInt(time) % 15 !== 0) {
          return next(ApiError.badRequest("Неправильное время"));
        }
        if (!!await Records.findOne({ where: { time: { [Op.gte]: time, [Op.lt]: (time + 15) }, doctorDoctorId, timetableTimetableId } })) {
          return next(ApiError.badRequest("Время занято"));
        }
        const record = await Records.create({ time, pacientPacientId, doctorDoctorId, timetableTimetableId })
        return res.json(record);
      } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
  async delet(req, res) {
    if (!req.user) {
      next(ApiError.badRequest("Пользователь не авторизован"))
    }
    try {
      const { record_id } = req.body
      await Records.destroy({ where: { record_id, pacientPacientId: req.user.pacient_id } });
      return res.json({ success: true });
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
  async getAll(req, res) {
    let {doctorDoctorId, pacientPacientId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let record;
        if (!doctorDoctorId && pacientPacientId) {
            record = await Records.findAndCountAll({where:{pacientPacientId}, limit, offset})
        }
        if (doctorDoctorId && !pacientPacientId) {
            record = await Records.findAndCountAll({where:{doctorDoctorId}, limit, offset})
        }
        if (doctorDoctorId && pacientPacientId) {
            record = await Records.findAndCountAll({where:{doctorDoctorId, pacientPacientId}, limit, offset})
        }
    return res.json(record)
  }
  async getOne(req, res) {
    const { id } = req.params
    const record = await Records.findOne({ where: { record_id: id } })
    return res.json(record)
  }
}
module.exports = new RecordController()
