const router  = require('express').Router()
const admincontroller = require('../controller/admin.controller')

router.get('/userslist' , admincontroller.userlist)
router.post('/createuser' , admincontroller.createuser)

module.exports = router