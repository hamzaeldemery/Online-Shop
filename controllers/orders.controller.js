const { validationResult } = require('express-validator')
const orderModels = require('../models/orders.model')


exports.getOrders = (req,res,next) => {
     let id = req.session.userId
     orderModels.getOrders(id).then((orders) => {
          res.render('orders',{
               admin: req.session.isAdmin,
               user: req.session.userId,
               pageName: 'Orders',
               orders:orders
          })
     })
}


exports.addOrder = (req,res,next) => {
     let order = req.flash('itm')[0]
     console.log('order')
     let address = req.body.address
     orderModels.addOrder(order,address).then(()=>{
          res.redirect('/orders')
     }).catch(err => console.log(err))
}

exports.deleteOrder = (req,res,next) => {
     let id = req.body.id
     orderModels.deleteOrder(id).then(() => {
          res.redirect('/orders')
     }).catch(err => console.log(err))
}


exports.delete = (req,res,next) => {
     orderModels.deleteAll(req.session.userId).then(() => {
          res.redirect('/orders')
     }).catch(err => console.log(err))
}


exports.addMany = (req,res,next) => {
     let items = req.flash('items')
     let address = req.body.address
     console.log(items)
     let data = []
     for(let itm of items){
          data.push({
               name:          itm.name,
               price:         itm.price,
               image:         itm.image,
               amount:        itm.amount,
               userId:        itm.userId,
               productId:     itm.productId,
               timeStamp:     Date.now(),
               address:       address,
               status:        'Pending'
          })
     }
     orderModels.addMany(data).then(()=>{
          res.redirect('/orders')
     }).catch(err => console.log(err))
}
 