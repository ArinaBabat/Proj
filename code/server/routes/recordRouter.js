const Router = require('express')
const router = new Router()
const recordController = require('../controllers/recordController.js')
router.post('/', recordController.create)
router.get('/', recordController.getAll)
router.get('/:id', recordController.getOne)
router.delete('/', recordController.delet)
module.exports = router
