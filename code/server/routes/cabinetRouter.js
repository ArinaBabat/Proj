const Router = require('express')
const router = new Router()
const cabinetController = require('../controllers/cabinetController.js')
router.post('/',cabinetController.create)
router.get('/',cabinetController.getAll)
router.delete('/',cabinetController.delet)
module.exports = router
