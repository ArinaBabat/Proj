const Router = require('express')
const router = new Router()
const pacientController = require('../controllers/pacientController.js')
const passport = require('passport');

router.get('/get', pacientController.get)
router.get('/login', passport.authenticate("vkontakte"));
router.get('/logout', pacientController.logout);
router.post('/set/doctor', pacientController.setDoctor);
router.post('/set/address', pacientController.setAddress);
router.post('/set/mail', pacientController.setMail);
router.get('/redirect', passport.authenticate("vkontakte"), pacientController.redirect)
module.exports = router
