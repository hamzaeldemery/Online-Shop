const productsModels = require('../models/products.model')

exports.getProduct = (req,res,next) =>{
     let id = req.params.id
     console.log(id)
     let productPromise
     let user = req.session.userId
     if(!id){
          productPromise = productsModels.getFirstProduct()
     }else{
          productPromise = productsModels.getProductById(id)
     }
     
     productPromise.then(product =>{
          // console.log(req.flash('carErr')[0])
          res.render('products',{
               user: user,
               cartErr: req.flash('cartErr')[0],
               admin: req.session.isAdmin,
               pageName: product.name,
               product:product
          })
          console.log(product)
     })  
 
}