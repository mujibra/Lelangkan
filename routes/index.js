const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/', Controller.home)
router.get('/productpage/:id', Controller.itemDetail)


module.exports = router