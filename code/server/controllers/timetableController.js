const {Timetable, Doctors} = require('../models/models')
const ApiError = require('../error/ApiError');

class TimetableController {
  async create(req, res, next) {
    try {
      const {day, start_of_admission, end_of_reception, cabinetCabinetId, doctorDoctorId} = req.body
      if (!doctorDoctorId || !day|| !start_of_admission || !end_of_reception || !cabinetCabinetId) {
            return next(ApiError.badRequest('Необходимо заполнить все поля'))
      }
      
      const timetable = await Timetable.create({day, start_of_admission, end_of_reception, cabinetCabinetId, doctorDoctorId})
      return res.json(timetable)
    } catch (e) {
          next(ApiError.badRequest(e.message))
      }
  }
  async delet(req, res) {
    try {
      const { timetable_id } = req.body
      await Timetable.destroy({ where: { timetable_id } });
      return res.json({ success: true });
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
  async getAll(req, res) {
    let {day, doctorDoctorId, cabinetCabinetId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let timetable;
        if (!day && !doctorDoctorId && !cabinetCabinetId) {
            timetable = await Timetable.findAndCountAll({limit, offset})
        }
        if (day && !doctorDoctorId && !cabinetCabinetId) {
            timetable = await Timetable.findAndCountAll({where:{day}, limit, offset})
        }
        if (!day && doctorDoctorId && !cabinetCabinetId) {
            timetable = await Timetable.findAndCountAll({where:{doctorDoctorId}, limit, offset})
        }
        if (day && doctorDoctorId && !cabinetCabinetId) {
            timetable = await Timetable.findAndCountAll({where:{doctorDoctorId, day}, limit, offset})
        }
        if (!day && !doctorDoctorId && cabinetCabinetId) {
            timetable = await Timetable.findAndCountAll({where:{cabinetCabinetId},limit, offset})
        }
        if (day && !doctorDoctorId && cabinetCabinetId) {
            timetable = await Timetable.findAndCountAll({where:{day, cabinetCabinetId}, limit, offset})
        }
        if (!day && doctorDoctorId && cabinetCabinetId) {
            timetable = await Timetable.findAndCountAll({where:{doctorDoctorId, cabinetCabinetId}, limit, offset})
        }
        if (day && doctorDoctorId && cabinetCabinetId) {
            timetable = await Timetable.findAndCountAll({where:{doctorDoctorId, day, cabinetCabinetId}, limit, offset})
        }
    return res.json(timetable)
  }
  async getOne(req, res) {
    const { id } = req.params
    const timetable = await Timetable.findOne({ where: { timetable_id: id } })
    return res.json(timetable)
  }
}
module.exports = new TimetableController()
