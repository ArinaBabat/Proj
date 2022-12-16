const Router = require('express')
const router = new Router()
const doctorController = require('../controllers/doctorController')
const authMiddleware = require('../middleware/authMiddleware')
router.post('/login', doctorController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/', doctorController.getAll)
router.get('/:id', doctorController.getOne)
module.exports = router
