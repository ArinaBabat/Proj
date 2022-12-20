const Router = require('express')
const router = new Router()
const doctorController = require('../controllers/doctorController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')
router.post('/create', checkRole('HEAD_PHYSICIAN'), doctorController.create)
router.post('/login',doctorController.login)
router.get('/auth',authMiddleware, doctorController.check)
router.get('/',doctorController.getAll)
router.get('/:id',doctorController.getOne)
module.exports = router
