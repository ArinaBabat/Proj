const Router = require('express')
const router = new Router()
const timetableController = require('../controllers/timetableController.js')
router.post('/', timetableController.create)
router.get('/', timetableController.getAll)
module.exports = router
