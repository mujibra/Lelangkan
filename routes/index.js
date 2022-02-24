const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()


//signin----
router.get('/signin', Controller.signInForm)
router.post('/signin', Controller.addUser)

//login-----
router.get('/login', Controller.logInForm)
router.post('/login', Controller.login)

//Session----
router.use((req, res, next) => {
    if (!req.session.userId) {
        const error = "Login first!"
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
    // console.log('Time:', Date.now())
    // next()
})

//logout-----
router.get('/logout', Controller.logout)

router.get('/home', Controller.home)
router.get('/productpage/:id', Controller.itemDetail)

module.exports = router