const Router = require('express');
const router = new Router();
const prescriptionController = require('../controllers/prescriptionController.js');
const dauthMiddleware = require('../middleware/dauthMiddleware');

router.post('/create', dauthMiddleware, prescriptionController.create); // WORKS
router.get('/', prescriptionController.getAll); // WORKS
router.get('/:id', prescriptionController.getOne); // WORKS

module.exports = router;
