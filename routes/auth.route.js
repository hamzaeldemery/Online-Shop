const router = require('express').Router()
const bodyParser = require('body-parser')
const authGuard = require('./guards/auth.guard')
const authController = require('../controllers/auth.controller')
const check = require('express-validator').check


const BPMW = bodyParser.urlencoded({
     extended:true     
}) 


router.get('/signup',BPMW,
     authGuard.isNotUser,
     authController.getSignup 
) 
router.post('/signup',BPMW, 
     check('username').not().isEmpty().withMessage("Username is required"),
     check('email').not().isEmpty().withMessage("Email is required")
     .isEmail().withMessage("Email invalid"),
     check('pass').isLength({min: 6}).withMessage("Password must be atleast 6 charachters"),
     check('confPass').custom((value,{req}) =>{
          if(value === req.body.pass)return true
          else throw "Passwords dont match"
     }),
     authController.postSignup 
) 
router.get('/login',BPMW,
     authGuard.isNotUser,
     authController.getLogin 
)
router.post('/login',BPMW, 
     check('username').not().isEmpty().withMessage("Username is required"),
     check('pass').not().isEmpty().withMessage("Password is required"),
     authController.postLogin 
)
router.all('/logout',BPMW, 
     authController.logout 
)
module.exports = router     