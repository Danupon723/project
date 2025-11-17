const router  = require('express').Router()
const admincontroller = require('../controller/admin.controller')

router.get('/userslist' , admincontroller.userlist)
router.post('/createuser' , admincontroller.createuser)
router.post('/createperiods' , admincontroller.createperiods)

module.exports = router