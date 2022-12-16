const Router = require('express')
const router = new Router()
const specialityController = require('../controllers/specialityController.js')
router.post('/', specialityController.create)
router.get('/', specialityController.getAll)
router.delete('/', specialityController.delet)
module.exports = router
