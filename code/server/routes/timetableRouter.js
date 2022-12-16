const Router = require('express')
const router = new Router()
router.post('/', checkRole('HEAD_PHYSICIAN'), typeController.create)
router.get('/', typeController.getAll)
module.exports = router
