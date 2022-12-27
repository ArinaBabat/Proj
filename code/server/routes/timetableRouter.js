const Router = require('express')
const router = new Router()
const timetableController = require('../controllers/timetableController.js')
const checkRole = require('../middleware/checkRoleMiddleware')
router.post('/create', checkRole('HEAD_PHYSICIAN'),  timetableController.create)
router.get('/', timetableController.getAll)
module.exports = router
