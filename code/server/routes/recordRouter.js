const Router = require('express')
const router = new Router()
const recordController = require('../controllers/recordController.js')

router.post('/create', recordController.create) // WORKS
router.post('/delete', recordController.delet) // WORKS
router.get('/', recordController.getAll) // WORKS
router.get('/:id', recordController.getOne) // WORKS

module.exports = router
