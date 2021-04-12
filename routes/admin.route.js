const router = require('express').Router()
const adminGuard = require('./guards/admin.guard')
const adminController = require('../controllers/admin.controller')
const check = require('express-validator').check
const multer = require("multer")
const bodyParser = require('body-parser')

const BPMW = bodyParser.urlencoded({
     extended:true     
}) 


router.get('/add',adminGuard,adminController.getAddProduct)
router.post('/add',adminGuard,
     multer({
     storage: multer.diskStorage({
          destination: (req,file,cb) => {
               cb(null,'images')
          },
          filename: (req,file,cb) => {
               cb(null,Date.now() + '-' + file.originalname)
          }
     })
     }).single('image'),
     check("name").not().isEmpty().withMessage("This feild is required!"),
     check("price").not().isEmpty().withMessage("This feild is required!")
          .isInt({min:1}).withMessage("Enter a value of one or more!"),
     check("description").not().isEmpty().withMessage("This feild is required!"),
     check("category").not().isEmpty().withMessage("This feild is required!"),
     check("image").custom((value,{req}) => {
          if(req.file)return true
          else throw "This feild is required!"
     }),adminController.postAddProduct
)

router.post('/delete',adminGuard,BPMW,adminController.deleteOrder)

router.post('/save',adminGuard,BPMW,adminController.saveOrder)

router.all('/orders',BPMW,adminGuard,adminController.getOrders)


module.exports = router
