const router = require('express').Router()
const authcontroller = require('../controller/auth')

router.post('/login' , authcontroller.login);
router.post('/register' , authcontroller.register)

module.exports = router
