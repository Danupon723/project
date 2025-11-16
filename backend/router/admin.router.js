const router  = require('express').Router()
const admincontroller = require('../controller/admin.controller')

router.get('/userslist' , admincontroller.userlist)

module.exports = router