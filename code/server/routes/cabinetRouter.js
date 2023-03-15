const Router = require('express');
const router = new Router();
const cabinetController = require('../controllers/cabinetController.js');
//const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', cabinetController.getAll); // WORKS

//router.post('/', checkRole('HEAD_PHYSICIAN'), cabinetController.create) // deprecated
//router.delete('/', checkRole('HEAD_PHYSICIAN'), cabinetController.delet) // deprecated
module.exports = router;
