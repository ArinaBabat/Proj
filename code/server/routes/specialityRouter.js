const Router = require('express')
const router = new Router()
const specialityController = require('../controllers/specialityController.js')
const checkRole = require('../middleware/checkRoleMiddleware')
router.post('/', checkRole('HEAD_PHYSICIAN'), specialityController.create) // deprecated
router.get('/', specialityController.getAll)
router.delete('/', checkRole('HEAD_PHYSICIAN'), specialityController.delet) // deprecated
module.exports = router
