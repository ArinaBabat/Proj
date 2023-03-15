const Router = require('express');
const router = new Router();
const pacientController = require('../controllers/pacientController.js');
const passport = require('passport');

router.get('/get', pacientController.get); // WORKS

router.get('/login', passport.authenticate("vkontakte")); // WORKS
router.get('/redirect', passport.authenticate("vkontakte"), pacientController.redirect); // WORKS
router.get('/logout', pacientController.logout); // WORKS

router.post('/set/doctor', pacientController.setDoctor); // WORKS
router.post('/set/address', pacientController.setAddress); // WORKS
router.post('/set/mail', pacientController.setMail); // WORKS

module.exports = router
