const Router = require('express')
const router = new Router()
const pauthMiddleware = require('../middleware/pauthMiddleware')
const pacientController = require('../controllers/pacientController.js')
router.post('/registration',pacientController.registration)
router.post('/login',pacientController.login)
router.get('/auth',pauthMiddleware,pacientController.check)
module.exports = router
