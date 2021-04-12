const router = require('express').Router()
const bodyParser = require('body-parser')
const check = require('express-validator').check

const cartController = require('../controllers/cart.controller')
const authGuard = require('./guards/auth.guard')

const BPMW = bodyParser.urlencoded({
     extended:true     
}) 

//Get page

router.get('/',BPMW,authGuard.isUserNotAdmin,
     check('amount').not().isEmpty().withMessage("Please fill in the amount")
     .isInt({min:1}).withMessage("Please enter a value of 1 or more"),
     cartController.getCart
)

//Save amount

router.post('/save',BPMW,authGuard.isUserNotAdmin,
     check('amount').not().isEmpty().withMessage("Please fill in the amount")
     .isInt({min:1}).withMessage("Please enter a value of 1 or more"),
     cartController.saveAmount
)

//confirm order and send to order and then delete

router.all('/orderConfirm',BPMW,authGuard.isUserNotAdmin,
     cartController.orderConfirm
)

router.post('/deleteConf',BPMW,authGuard.isUserNotAdmin,
     check("address").not().isEmpty().withMessage("Please fill in your Address"),
     cartController.deleteItemConfirmOrder
)

// order All cart items and delete them


router.all('/orderAll',BPMW,authGuard.isUserNotAdmin,
     cartController.getAddress
)

router.post('/deleteConfAll',BPMW,authGuard.isUserNotAdmin,
     check("address").not().isEmpty().withMessage("Please fill in your Address"),
     cartController.getAllCart
)


// delete one item

router.post('/delete',BPMW,authGuard.isUserNotAdmin,
     cartController.deleteItem
)

//delete All items

router.post('/deleteAll',BPMW,authGuard.isUserNotAdmin,
     cartController.deleteAll
)

//add item to cart

router.post('/',BPMW,authGuard.isUserNotAdmin,
     check('amount').not().isEmpty().withMessage("Please fill in the amount")
     .isInt({min:1}).withMessage("Please enter a value of 1 or more"),
     cartController.addItem
)


module.exports = router   