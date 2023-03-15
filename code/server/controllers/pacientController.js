const { Pacients, Doctors } = require('../models/models')
const ApiError = require('../error/ApiError');

class PacientController {
  async redirect(req, res) {
    return res.redirect('http://localhost:3000/auth-redirect')
  }
  async get(req, res) {
    return res.json({ user: req.user })
  }
  async logout(req, res) {
    if (req.user) {
      req.logOut();
      req.session = null;
    }
    res.status(200).json({ success: true, message: "Signed out successfully" });
  };
  async setDoctor(req, res, next) {
    try {
      if (!req.user) {
        return next(ApiError.internal('Пользователь не войден'));
      }
      const { doctor_id } = req.body;
      const doctor = await Doctors.findOne({ where: { doctor_id } });
      if (!doctor) {
        return next(ApiError.internal('Такого врача нет'));
      }
      await Pacients.update({ doctorDoctor_id: doctor_id }, { where: { pacient_id: req.user.pacient_id } });
      return res.json({ success: true });
    } catch (e) {
      console.log(e);
      return next(ApiError.internal('Ошибка при редактировании врача'));
    }
  }
  async setAddress(req, res, next) {
    try {
      if (!req.user) {
        return next(ApiError.internal('Пользователь не войден'));
      }
      const { address } = req.body;
      if (!address) {
        return next(ApiError.internal('Адрес пустой'));
      }
      await Pacients.update({ address: address }, { where: { pacient_id: req.user.pacient_id } });
      return res.json({ success: true });
    } catch (e) {
      console.log(e);
      return next(ApiError.internal('Ошибка при редактировании адреса'));
    }
  }
  async setMail(req, res, next) {
    try {
      if (!req.user) {
        return next(ApiError.internal('Пользователь не войден'));
      }
      const { mail } = req.body;
      if (!mail) {
        return next(ApiError.internal('Почта пустая'));
      }
      await Pacients.update({ mail: mail }, { where: { pacient_id: req.user.pacient_id } });
      return res.json({ success: true });
    } catch (e) {
      console.log(e);
      return next(ApiError.internal('Ошибка при редактировании почты'));
    }
  }
}

module.exports = new PacientController()
