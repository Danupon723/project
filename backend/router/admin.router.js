const router  = require('express').Router()
const admincontroller = require('../controller/admin.controller')

router.get('/list' , admincontroller.list)
router.post('/createuser' , admincontroller.createuser)
router.post('/createperiods' , admincontroller.createperiods)
router.get('/assignments' , admincontroller.assignments)
module.exports = router