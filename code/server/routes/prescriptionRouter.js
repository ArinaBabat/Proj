const Router = require('express')
const router = new Router()
const prescriptionController = require('../controllers/prescriptionController.js')
router.post('/',prescriptionController.create)
router.get('/',prescriptionController.getAll)
router.get('/:id',prescriptionController.getOne)
module.exports = router
