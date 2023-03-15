const Router = require('express');
const router = new Router();
const doctorController = require('../controllers/doctorController');
const dauthMiddleware = require('../middleware/dauthMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');
const bcrypt = require('bcrypt');

router.post('/create', checkRole('HEAD_PHYSICIAN'), doctorController.create); // WORKS
router.post('/login', doctorController.login); // WORKS
router.get('/auth', dauthMiddleware, doctorController.check); // WORKS

router.get('/pacients', dauthMiddleware, doctorController.getPacients); // WORKS

router.get('/', doctorController.getAll); // WORKS
router.get('/:id', doctorController.getOne); // WORKS

module.exports = router;
