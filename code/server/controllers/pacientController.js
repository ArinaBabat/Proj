const {Pacients, Doctors} = require('../models/models')
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (phone, password) => {
    return jwt.sign(
        {phone, password},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class PacientController {
  async registration(req, res) {
    try {
      const {first_name, last_name, password, address, doctorDoctorId,phone} = req.body

      if (!password || !doctorDoctorId|| !first_name || !last_name ||!address||!phone) {
            return next(ApiError.badRequest('Необходимо заполнить все поля'))
        }
        const candidate = await Pacients.findOne({where: {phone}})
          if (candidate) {
              return next(ApiError.badRequest('Пользователь с таким номером уже существует'))
          }
      const hashPassword = await bcrypt.hash(password, 5)
      const pacient = await Pacients.create({first_name, last_name, password: hashPassword, address, doctorDoctorId,phone})
      const token = generateJwt(doctor.doctor_id, doctor.role)
      return res.json({token})
    } catch (e) {
          next(ApiError.badRequest(e.message))
      }
  }
  async login(req, res) {
    const {phone, password} = req.body
    if (!password || !phone) {
        return next(ApiError.badRequest('Введите свой номер и пароль'))
    }
    const pacient = await Pacients.findOne({where: {phone}})

    let comparePassword = bcrypt.compareSync(password, pacient.password)
    if (!pacient || !comparePassword) {
      return next(ApiError.internal('Неверный номер или пароль'))
    }
    const token = generateJwt(pacient.phone, pacient.password)
    return res.json({token})
  }
  async check(req, res, next) {
    try{
        const token = generateJwt(req.pacient.phone)
        return res.json({token})
      }  catch (e) {
              next(ApiError.badRequest(e.message))
          }
    }
}
module.exports = new PacientController()
