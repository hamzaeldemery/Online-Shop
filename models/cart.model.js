const { Db } = require('mongodb')
const mongoose = require('mongoose')

const DB_url = 'mongodb://localhost:27017/online-shop'


const productSchema = mongoose.Schema({
     name: String,
     price:Number,
     image:String,
     amount: Number,
     userId: String,
     productId: String,
     timeStamp: Number

}) 

const CartItem = mongoose.model('cart',productSchema)

exports.updateItem = (id,amount) => {
     return new Promise((resolve, reject) => {
          mongoose.connect(DB_url).then(() => {
               CartItem.findByIdAndUpdate(
                    id
               ,{
                    $set:{
                         amount: amount
                    }
               }).then(obj => {
                    mongoose.disconnect()
                    resolve()
               })
          }).catch(err => {
               mongoose.disconnect()
               reject(err)
          })
     })
}

exports.deleteItem = (id) => {
     return new Promise((resolve, reject) => {
          mongoose.connect(DB_url).then(() => {
               CartItem.findByIdAndDelete(id).then(itm => {
                    mongoose.disconnect()
                    resolve(itm)
               })
          }).catch(err => {
               mongoose.disconnect()
               reject(err)
          })
     })
}

exports.deleteAll = (id) => {
     return new Promise((resolve, reject) => {
          mongoose.connect(DB_url).then(() => {
               CartItem.deleteMany({userId:id}).then(itm => {
                    mongoose.disconnect()
                    resolve(itm)
               })
          }).catch(err => {
               mongoose.disconnect()
               reject(err)
          })
     })
}


exports.addItem = data => {

     return new Promise((resolve,reject) => {
          mongoose.connect(DB_url).then(() =>{
               CartItem.updateOne({
                    userId: data.userId,
                    productId: data.productId
               },{
                    $set:{
                         name:      data.name,
                         price:     data.price,
                         image:     data.image,
                         timeStamp: data.timeStamp
                    },
                    $inc:{
                         amount:data.amount
                    }
               },{
                    upsert:true
               }).then(() => {
                    mongoose.disconnect()
                    resolve()
               }).catch(err => {
                    mongoose.disconnect()
                    reject(err)
               })
          })
     })
}

exports.getCartItems = (id) => {
     return new Promise((resolve,reject) =>{
          mongoose.connect(DB_url).then(() => {
               CartItem.find({
                    userId: id
               }).sort({'timeStamp':-1}).then((items) => {
                    mongoose.disconnect()
                    resolve(items)
               })
          }).catch(err => {
               mongoose.disconnect()
               reject(err)
          })
     })
}


exports.getAllItems = (id) => {
     return new Promise((resolve,reject) =>{
          mongoose.connect(DB_url).then(() => {
               CartItem.find({userId:id}).then((items) => {
                    mongoose.disconnect()
                    resolve(items)
               })
          }).catch(err => {
               mongoose.disconnect()
               reject(err)
          })
     })
}

