const router = require('express').Router()
const authcontroller = require('../controller/auth')

router.post('/login' , authcontroller.login);
router.post('/register' , authcontroller.register)
router.get('/departments' , authcontroller.department)
router.get('/groups' , authcontroller.groups)
module.exports = router
