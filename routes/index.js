const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()


//signin----
router.get('/signin', Controller.signInForm)
router.post('/signin', Controller.addUser)

//login-----
router.get('/login', Controller.logInForm)
router.post('/login', Controller.login)

router.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
})

router.get('/home', Controller.home)

module.exports = router