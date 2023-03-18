const Router = require('express');
const router = new Router();
const timetableController = require('../controllers/timetableController.js');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/create', checkRole('HEAD_PHYSICIAN'), timetableController.create); // WORKS
router.delete('/', checkRole('HEAD_PHYSICIAN'), timetableController.delet); // WORKS
router.get('/', timetableController.getAll); // WEIRD
router.get('/:id', timetableController.getOne) // WORKS

module.exports = router;
