const {Records, Timetable, Pacients, Prescriptions} = require('../models/models')
const ApiError = require('../error/ApiError');
const { Op, Sequelize } = require('sequelize');
class RecordController {
  async create(req, res, next) {
      if (!req.user) {
        ApiError.badRequest("Пользователь не авторизован");
      }
      let pacientPacientId = req.user.pacient_id;
      try {
        const {start, timetableTimetableId} = req.body

        const timetable = (await Timetable.findOne({ where: { timetable_id: timetableTimetableId } })).dataValues;

        if (!timetable) {
          return next(ApiError.badRequest('Такого в расписании нет'))
        }

        const startObject = new Date(start);
        const endObject = new Date(startObject.getTime() + 15 * 60 * 1000)

        const t_start = new Date(timetable.start);
        const t_end = new Date(timetable.end);

        if (startObject < t_start) {
          return next(ApiError.badRequest("Неправильное время"));
        }
        if (endObject > t_end) {
          return next(ApiError.badRequest("Неправильное время"));
        }
        if ((parseInt(startObject.getTime() / 60000) - parseInt(t_start.getTime() / 60000)) % 15 !== 0) {
          return next(ApiError.badRequest("Неправильное время"));
        }
        if (!!await Records.findOne({ 
          where: { 
            start: { 
              [Op.gte]: startObject.toString(), 
              [Op.lt]: endObject.toString()
            },
            timetableTimetableId 
          } })
        ) {
          return next(ApiError.badRequest("Время занято"));
        }
        const record = await Records.create({ start: startObject.toString(), end: endObject.toString(), pacientPacientId, timetableTimetableId })
        return res.json(record);
      } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
  async delet(req, res, next) {
    if (!req.user) {
      next(ApiError.badRequest("Пользователь не авторизован"))
    }
    try {
      const { record_id } = req.body
      await Records.destroy({ where: { record_id, pacientPacientId: req.user.pacient_id } });
      return res.json({ success: true });
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }
  async getAll(req, res) {
    let { doctorDoctorId, pacientPacientId, limit, page, timetableTimetableId } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let record;
        if (timetableTimetableId) {
          record = await Records.findAndCountAll({ 
            where: { timetableTimetableId } ,
            include: [
              { model: Pacients } , 
              { model: Prescriptions }
            ],
            order: [
              ['start', 'ASC'],
            ]
          })
        }
        else if (!doctorDoctorId && pacientPacientId) {
            record = await Records.findAndCountAll({
              where: { pacientPacientId },
              include: [
                { model: Pacients },
                { model: Prescriptions }
              ],
              order: [
                ['start', 'ASC'],
              ]
            })
        }
        else if (doctorDoctorId && !pacientPacientId) {
            record = await Records.findAndCountAll({
              where: { doctorDoctorId },
              include: [
                { model: Pacients },
                { model: Prescriptions }
              ],
              order: [
                ['start', 'ASC'],
              ]
            })
        }
        else if (doctorDoctorId && pacientPacientId) {
            record = await Records.findAndCountAll({
              where: { doctorDoctorId, pacientPacientId },
              include: [
                { model: Pacients },
                { model: Prescriptions }
              ],
              order: [
                ['start', 'ASC'],
              ]
            })
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
