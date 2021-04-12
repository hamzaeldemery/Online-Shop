const router = require('express').Router()
const bodyParser = require('body-parser')
const orderController = require('../controllers/orders.controller')
const authGuard = require('./guards/auth.guard')

const BPMW = bodyParser.urlencoded({
     extended:true     
}) 



router.get('/',BPMW,authGuard.isUserNotAdmin,orderController.getOrders)

router.post('/',BPMW,authGuard.isUserNotAdmin,orderController.addOrder)
router.post('/delete',BPMW,authGuard.isUserNotAdmin,orderController.deleteOrder)
router.post('/deleteAll',BPMW,authGuard.isUserNotAdmin,orderController.delete)
router.post('/addMany',BPMW,authGuard.isUserNotAdmin,orderController.addMany)



module.exports = router 


