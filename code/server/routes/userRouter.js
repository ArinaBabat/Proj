const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const userController = require('../controllers/userController.js')
router.get('/auth',authMiddleware,userController.check)
module.exports = router
