require('dotenv').config()
const express = require('express')
const sequelize = require('./db.js')
const models = require('./models/models.js')
const cors = require('cors')
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys.js');
const router = require('./routes/index.js')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const passportSetup = require('./config/passport-setup.js');

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({ origin: process.env.UI_HOST, credentials: true }))

app.use('/api', router)

app.use(errorHandler)
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log('Server started on port',PORT))
    } catch (e) {
        console.log(e)
    }
}
start()
