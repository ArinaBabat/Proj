const {Doctors, Specialties,Users} = require('../models/models')
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, role) => {
    return jwt.sign(
        {id, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class DoctorController {
  async create(req, res, next) {
    try {
      const {first_name, last_name, password, specialitySpecialityId, role} = req.body

      if (!password || !specialitySpecialityId|| !first_name || !last_name) {
            return next(ApiError.badRequest('Необходимо заполнить все поля'))
        }
      const spec = await Specialties.findOne({where: {speciality_id: specialitySpecialityId}})
      if (!spec) {
        return next(ApiError.badRequest('Такой специальности не существует'))
      }
      const hashPassword = await bcrypt.hash(password, 5)
      const doctor = await Doctors.create({first_name, last_name, password: hashPassword, specialitySpecialityId, role})
      const user = await Users.create({login:doctor.doctor_id, tab:true})
      const token = generateJwt(doctor.doctor_id, doctor.role)
      return res.json({token})
    } catch (e) {
          next(ApiError.badRequest(e.message))
      }
  }
  async login(req, res, next) {
    const {doctor_id, password} = req.body
    if (!password || !doctor_id) {
        return next(ApiError.badRequest('Введите свой id и пароль'))
    }
    const doctor = await Doctors.findOne({where: {doctor_id}})

    let comparePassword = bcrypt.compareSync(password, doctor.password)
    if (!doctor || !comparePassword) {
      return next(ApiError.internal('Неверный id или пароль'))
    }
    const token = generateJwt(doctor.doctor_id, doctor.role)
    return res.json({token})
  }
  async check(req, res, next) {
    try{
        const token = generateJwt(req.doctor.doctor_id, req.doctor.role)
        return res.json({token})
      }  catch (e) {
              next(ApiError.badRequest(e.message))
          }
    }
  async getAll(req, res) {
    let {specialitySpecialityId, limit, page} = req.query
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit
    let doctors;
    if (!specialitySpecialityId) {
      doctors = await Doctors.findAndCountAll({limit, offset})
    }
    if (specialitySpecialityId) {
      doctors = await Doctors.findAndCountAll({where:{specialitySpecialityId}, limit, offset})
    }
    return res.json(doctors)
  }
  async getOne(req, res) {
    const {id} = req.params
        const doctor = await Doctors.findOne({where: {id}})
      return res.json(doctor)
  }
}
module.exports = new DoctorController()
