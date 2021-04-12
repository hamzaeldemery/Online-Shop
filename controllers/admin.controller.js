
const { validationResult } = require('express-validator')
const orderModels = require('../models/orders.model')
const productModels = require('../models/products.model')

// Add product page

exports.getAddProduct = (req,res,next) => {
     res.render('addProduct',{
          admin: req.session.isAdmin,
          user: req.session.userId,
          errVal:req.flash('errVal'),
          pageName:'Add product',
     })
}

exports.postAddProduct = (req,res,next) => {
     console.log(validationResult(req).array())
     if(validationResult(req).isEmpty()){
          data = {
               name : req.body.name,
               description: req.body.description,
               price : req.body.price,
               category : req.body.category,
               image: req.file.filename
          }
          productModels.addProduct(data).then(() => {
               res.redirect('/')
          })
     }else{
          req.flash('errVal',validationResult(req).array())
          res.redirect('/admin/add')
     }

}

exports.deleteOrder = (req,res,next) => {
     orderModels.deleteOrder(req.body.itmId).then( () => {
          res.redirect('/admin/orders')
     })
}


exports.saveOrder = (req,res,next) => {
     console.log(req.body.status + " ..." + req.body.itmId)
     orderModels.updateStatus(req.body.itmId,req.body.status).then(() => {
          res.redirect('/admin/orders')
     })
}


// Manage orders 

exports.getOrders = (req,res,next) => {

     let stat = req.query;
     console.log(stat)
     stats = ['Pending', ' Shipped', 'Delivered']
     if(stat && stats.includes(stat)){
          orderModels.filterStat(stat).then((orders) => {
               res.render('manageOrders',{ 
                    admin: req.session.isAdmin,
                    user: req.session.userId,
                    pageName:'Manage Orders',
                    orders: orders
               })
          })
     }else{
          orderModels.getOrdersAll().then((orders) => {
               res.render('manageOrders',{ 
                    admin: req.session.isAdmin,
                    user: req.session.userId,
                    pageName:'Manage Orders',
                    orders: orders
               })
          })
     }
} 

