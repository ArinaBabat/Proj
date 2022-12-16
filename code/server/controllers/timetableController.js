const {Timetable} = require('../models/models')
const ApiError = require('../error/ApiError');

class TimetableController {
  async create(req, res, next) {
    try {
      const {day, start_of_admission, end_of_reception, cabinetCabinetId, doctorDoctorId} = req.body
      const timetable = await Timetable.create({day, start_of_admission, end_of_reception, cabinetCabinetId, doctorDoctorId})
      return res.json(timetable)
    } catch (e) {
          next(ApiError.badRequest(e.message))
      }
  }
  async getAll(req, res) {
    const timetable = await Timetable.findAll()
    return res.json(timetable)
  }
  async delet(req, res) {

  }
}
module.exports = new TimetableController()
