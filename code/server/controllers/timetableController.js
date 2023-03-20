const { Timetable, Doctors, Cabinets } = require('../models/models')
const ApiError = require('../error/ApiError');
const { Op } = require("sequelize");

class TimetableController {
  async create(req, res, next) {
    try {
      const { start, end, cabinetCabinetId, doctorDoctorId} = req.body

      if (!doctorDoctorId || !start || !end || !cabinetCabinetId) {
            return next(ApiError.badRequest('Необходимо заполнить все поля'))
        }

        const doctor = await Doctors.findOne({
          where: { doctor_id: doctorDoctorId }
        });

        const cabinet = await Cabinets.findOne({
          where: { cabinet_id: cabinetCabinetId }
        });

      if (!doctor || !cabinet) {
        return next(ApiError.badRequest('Неправильные поля'))
      }

        if (cabinet.speciality_id !== doctor.speciality_id) {
          return next(ApiError.badRequest('Специальность доктора и кабинета должна совпадать'))
        }

      if (new Date(start) >= new Date(end)) {
        return next(ApiError.badRequest('Неправильное время'))
      }

      const collision = await Timetable.findOne(
      { where: 
        { [Op.or]: [
          { [Op.and]: [
            { cabinetCabinetId }, 
            {
              start: {
                [Op.lt]: end
              }
            },
            {
              end: {
                [Op.gt]: start
              }
            }
          ]},
          {
            [Op.and]: [
              { doctorDoctorId },
              {
                start: {
                  [Op.lt]: end
                }
              },
              {
                end: {
                  [Op.gt]: start
                }
              }
            ]
          }
        ]}
      });
      if (collision) {
        return next(ApiError.badRequest('Расписание пересекается'))
      }

      const timetable = await Timetable.create({start, end, cabinetCabinetId, doctorDoctorId});
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
          timetable = await Timetable.findAndCountAll({
            order: [
              ['start', 'ASC'],
            ],
          })
        }
        if (day && !doctorDoctorId && !cabinetCabinetId) {
          timetable = await Timetable.findAndCountAll({
            order: [
              ['start', 'ASC'],
            ], where:{day}})
        }
        if (!day && doctorDoctorId && !cabinetCabinetId) {
          timetable = await Timetable.findAndCountAll({
            order: [
              ['start', 'ASC'],
            ], where:{doctorDoctorId}})
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
