const Router = require('express')
const router = new Router()
const pauthMiddleware = require('../middleware/pauthMiddleware')
const pacientController = require('../controllers/pacientController.js')
const passport = require('passport');

router.get('/get', pacientController.get)
router.get('/login', passport.authenticate("vkontakte"));
router.get('/logout', (req, res) => {
  if (req.user) {
    req.logOut();
    req.session = null;
  } 
  res.status(200).json({ success: true, message: "Signed out successfully" });
});
router.get('/redirect', passport.authenticate("vkontakte"), pacientController.redirect)
router.get('/auth', pauthMiddleware, pacientController.check)
module.exports = router
