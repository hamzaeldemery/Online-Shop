const { Db } = require('mongodb')
const mongoose = require('mongoose')

const DB_url = 'mongodb://localhost:27017/online-shop'


const orderSchema = mongoose.Schema({
     name:          String,
     price:         Number,
     image:         String,
     amount:        Number,
     userId:        String,
     productId:     String,
     timeStamp:     Number,
     address:       String,
     status:        String
}) 

const OrderItem = mongoose.model('order',orderSchema)

exports.getOrders = (id) => {
     return new Promise((resolve,reject) => {
          mongoose.connect(DB_url).then(() => {
               OrderItem.find({userId:id}).then((orders) => {
                    mongoose.disconnect()
                    resolve(orders)
               })
          }).catch(err => {
               mongoose.disconnect()
               reject(err)
          })
     })
}

exports.getOrdersAll = () => {
     return new Promise((resolve,reject) => {
          mongoose.connect(DB_url).then(() => {
               OrderItem.find().then((orders) => {
                    mongoose.disconnect()
                    resolve(orders)
               })
          }).catch(err => {
               mongoose.disconnect()
               reject(err)
          })
     })
}



exports.addOrder = (itm,address) => {
     let order = new OrderItem({
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
     return new Promise((resolve, reject) => {
          mongoose.connect(DB_url).then(() => {
               order.save().then(()=>{
                    console.log(order)
                    mongoose.disconnect()
                    resolve()
               })
          }).catch(err => {
               mongoose.disconnect()
               reject(err)
          })
     })
}

exports.deleteOrder = (id) => {
     return new Promise((resolve,reject) => {
          mongoose.connect(DB_url).then(() => {
               OrderItem.deleteOne({_id: id}).then(() =>{
                    mongoose.disconnect()
                    resolve()
               })
          }).catch(err => {
               mongoose.disconnect()
               reject(err)
          })
     })
}

exports.deleteAll = (id) => {
     return new Promise((resolve,reject) => {
          mongoose.connect(DB_url).then(() => {
               OrderItem.deleteMany({userId:id}).then(() =>{
                    mongoose.disconnect()
                    resolve()
               })
          }).catch(err => {
               mongoose.disconnect()
               reject(err)
          })
     })
}

exports.addMany = (data) => {

     return new Promise((resolve,reject) => {
          mongoose.connect(DB_url).then(() => {
               OrderItem.insertMany(data).then(() =>{
                    mongoose.disconnect()
                    resolve()
               })
          }).catch(err => {
               mongoose.disconnect()
               reject(err)
          })
     })
}


exports.updateStatus = (id,stat) => {
     return new Promise((resolve,reject) => {
          mongoose.connect(DB_url).then(() => {
               OrderItem.updateOne({
                    _id:id
               },{
                    status:stat
               }).then(() => {
                    mongoose.disconnect()
                    resolve()
               })
          }).catch(err => {
               mongoose.disconnect()
               reject(err)
          })
     })
}

exports.filterStat = (stat) => {
     return new Promise((resolve,reject) => {
          mongoose.connect(DB_url).then(() => {
               OrderItem.find({
                    status:stat
               }).then((itms) =>{
                    mongoose.disconnect()
                    resolve(itms)
               })
          }).catch((err) => {
               mongoose.disconnect()
               reject(err)
          })
     })
}