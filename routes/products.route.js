const router = require('express').Router()
const productController = require('../controllers/products.controller')



router.get('/',productController.getProduct)
 
router.get('/:id',productController.getProduct)

module.exports = router 