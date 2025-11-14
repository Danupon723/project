const router = require('express').Router()
const authcontroller = require('../controller/auth')

router.post('/login' , authcontroller.login);

module.exports = router
