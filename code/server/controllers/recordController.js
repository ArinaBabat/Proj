const {Records, Timetable} = require('../models/models')
const ApiError = require('../error/ApiError');
class RecordController {
  async create(req, res, next) {
      try {
        const {time, pacientPacientId, doctorDoctorId, timetableTimetableId} = req.body
        if (req.Timetable.timetable_id == timetableTimetableId && req.Timetable.doctorDoctorId == doctorDoctorId && time >= req.Timetable.start_of_admission && time <= req.Timetable.end_of_reception - 15){
            if (timetableTimetableId != req.Records.timetableTimetableId || doctorDoctorId != req.Records.doctorDoctorId || time <= req.Records.time - 15 || time >= req.Records.time + 15){
              const record = await Records.create({time, pacientPacientId, doctorDoctorId, timetableTimetableId})
              return res.json(record)
            }
        }
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

  }
  async delet(req, res) {

  }
}
module.exports = new RecordController()
