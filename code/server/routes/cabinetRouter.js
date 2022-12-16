const Router = require('express')
const router = new Router()
router.post('/',checkRole('HEAD_PHYSICIAN'),)
router.get('/',)
router.delete('/',checkRole('HEAD_PHYSICIAN'),)
module.exports = router
