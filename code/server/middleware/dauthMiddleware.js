const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
      console.log(req.headers.authorization);
      if ((!token) || (req.headers.authorization === "Bearer undefined" || req.headers.authorization === "Bearer null")) {
            return res.status(200).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.doctor = decoded
        next()
    } catch (e) {
        res.status(200).json({message: "Не авторизован"})
    }
};
