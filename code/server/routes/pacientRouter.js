const Router = require('express')
const router = new Router()
const pacientController = require('../controllers/pacientController.js')
router.post('/registration',pacientController.registration)
router.post('/login',pacientController.login)
router.get('/auth',pacientController.check)
module.exports = router
