const productsModels = require('../models/products.model')

exports.getHome = (req,res,next)=>{
     //filter 
     
      
     let cat = req.query.category
     let productsPromise
     let selc
     let user = req.session.userId
     productsModels.getAllCategories().then(categories =>{
          if(cat && categories.includes(cat) ){
               productsPromise = productsModels.getAllProducts(cat)
               selc = cat
          }else{
               productsPromise = productsModels.getAllProducts("all")
               selc = 'all'
          }
          productsPromise.then(products =>{
               res.render('index',{
                    user: user,
                    admin: req.session.isAdmin,
                    selc : selc,
                    pageName: 'Home',
                    cartErr:req.flash('cartErr')[0],
                    cartErrProd: req.flash('cartErrProd')[0],
                    products: products, 
                    category : categories
               })  
          })               
     })
     
           
}