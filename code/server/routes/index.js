const Router = require('express')
const router = new Router()
const cabinetRouter = require('./cabinetRouter.js')
const doctorRouter = require('./doctorRouter.js')
const pacientRouter = require('./pacientRouter.js')
const prescriptionRouter = require('./prescriptionRouter.js')
const recordRouter = require('./recordRouter.js')
const specialityRouter = require('./specialityRouter.js')
const timetableRouter = require('./timetableRouter.js')

router.use('/cabinet', cabinetRouter)
router.use('/doctor', doctorRouter)
router.use('/pacient', pacientRouter)
router.use('/prescription', prescriptionRouter)
router.use('/record', recordRouter)
router.use('/speciality', specialityRouter)
router.use('/timetable', timetableRouter)

module.exports = router
