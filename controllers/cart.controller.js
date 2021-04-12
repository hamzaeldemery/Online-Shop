const { validationResult } = require('express-validator')
const cartModels = require('../models/cart.model')


//display cart

exports.getCart = (req,res,next) => {
     let usr = req.session.userId
     cartModels.getCartItems(usr).then(itms => {
          res.render('cart',{
               user: req.session.userId,
               cartErr:req.flash('amountErr')[0],
               pageName: 'Cart',
               admin: req.session.isAdmin,
               cartId:req.flash('itmId')[0],
               itms: itms
          }) 
     }) 
}

//edit amount of cart item

exports.saveAmount = (req,res,next) => {
     if(validationResult(req).isEmpty()){
          let id = req.body.itmId
          let amount = req.body.amount
          cartModels.updateItem(id,amount).then(() =>{
               res.redirect('/cart')
          }).catch(err => console.log(err))
     }else{
          req.flash('amountErr',validationResult(req).array())
          req.flash('itmId',req.body.itmId)
          res.redirect('/cart')
     }
}

//delete item of cart

exports.deleteItem = (req,res,next) => {
     let itmId = req.body.itmId

     cartModels.deleteItem(itmId).then(() =>{
          res.redirect('/cart')
     }).catch(err => console.log(err))
}


// delete all items of cart

exports.deleteAll = (req,res,next) => {
     
     cartModels.deleteAll(req.session.userId).then(itm =>{
          res.redirect('/cart')
     }).catch(err => console.log(err))

}

//add item to cart

exports.addItem = (req,res,next) => {
     if(validationResult(req).isEmpty()){
          let userId = req.session.userId
          let amount = req.body.amount
          let image = req.body.image
          let price = req.body.price
          let productId = req.body.productId
          let name = req.body.name
          let timeStamp = Date.now()
          cartModels.addItem({
               name,price,image,amount,userId,productId,timeStamp
          }).then(() => {
               res.redirect('/cart')
          }).catch(err => console.log(err))
     }else{
          req.flash('cartErr',validationResult(req).array())
          req.flash('cartErrProd',req.body.name)
          res.redirect(req.body.path)
     }
}

//confrim item and move it to orders

exports.orderConfirm = (req,res,next) => {
     let err = req.flash('errAdd')[0]
     let id 
     if(err){
          id = req.flash('Id')[0]
     }else{
          id = req.body.itmId
     }
     res.render('confirmOrder',{
          admin: req.session.isAdmin,
          id: id,
          pageName: 'Confirm Order',
          err: err,
          user: req.session.userId,
     })
}

// delete ordered item

exports.deleteItemConfirmOrder = (req,res,next) => {
     let itmId = req.body.itmId
     if(validationResult(req).isEmpty()){    
          cartModels.deleteItem(itmId).then(itm =>{
               req.flash('itm',itm)
               res.redirect(307,'/orders')
          }).catch(err => console.log(err))
     }else{
          req.flash('errAdd',validationResult(req).array())
          req.flash('Id',itmId)
          res.redirect('/cart/orderConfirm')
     }
          
}

exports.getAddress = (req,res,next) => {
     let err = req.flash('valErr')[0]
     res.render('confirmAll',{
          admin: req.session.isAdmin,
          err: err,
          pageName: 'Confrim Order',
          user: req.session.userId,
     })
}

exports.getAllCart = (req,res,next) => {
     if(validationResult(req).isEmpty()){
          cartModels.getAllItems(req.session.userId).then((items) => {
               console.log(items)
               cartModels.deleteAll(req.session.userId).then(() => {
                    req.flash('items',items)
                    res.redirect(307,'/orders/addMany')
               })
          })
     }else{
          req.flash('valErr',validationResult(req).array())
          res.redirect('/cart//orderAll')
     }
}