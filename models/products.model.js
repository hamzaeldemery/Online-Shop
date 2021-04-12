const mongoose = require('mongoose')

const DB_url = 'mongodb://localhost:27017/online-shop'

const productSchema = mongoose.Schema({
     name: String,
     image: String,
     price:Number,
     description: String,
     category: String
}) 

const Product = mongoose.model('product',productSchema)


exports.getAllCategories = () => {
     return new Promise((resolve,reject)=>{ //make sure db connects, gets prods, disconnects to proceed
          mongoose.connect(DB_url).then(()=>{
               // console.log(Product.distinct('category'))
               Product.distinct('category').then(categories => {
                    mongoose.disconnect()
                    resolve(categories)
               })
          }).catch(err => {
               mongoose.disconnect()
               reject(err)
          })
     })
}

exports.getAllProducts = (categor) => {
     console.log(categor)
     
     if(categor !== 'all'){
          return new Promise((resolve,reject)=>{ //make sure db connects, gets prods, disconnects to proceed
               mongoose.connect(DB_url).then(()=>{
                    Product.find({
                         category: categor
                    }).then(products =>{
                         mongoose.disconnect()
                         resolve(products)
                    })
               }).catch(err => {
                    mongoose.disconnect()
                    reject(err)
               })
          })
     }
     else{
          return new Promise((resolve,reject)=>{ //make sure db connects, gets prods, disconnects to proceed
               mongoose.connect(DB_url).then(()=>{
                    Product.find({
                         
                    }).then(products =>{
                         mongoose.disconnect()
                         resolve(products)
                    })
               }).catch(err => {
                    mongoose.disconnect()
                    reject(err)
               })
          })
     }

}

exports.getFirstProduct = () =>{
     return new Promise((resolve,reject) =>{
          mongoose.connect(DB_url)
          .then(() =>{
               Product.findOne().then
          (product => {
               mongoose.disconnect()
               resolve(product)
          })
          }).catch(err => {
               mongoose.disconnect()
               reject(err)
          })
     })       
}

exports.getProductById = (id) =>{
     return new Promise((resolve,reject) =>{
          mongoose.connect(DB_url)
          .then(() =>{
               Product.findById(id).then
          (product => {
               mongoose.disconnect()
               resolve(product)
          })
          }).catch(err => {
               mongoose.disconnect()
               reject(err)
          })
     })       
}


exports.addProduct = (obj) => {
     return new Promise((resolve,reject) => {
          let product = new Product({
               name: obj.name,
               description: obj.description,
               price : obj.price,
               category : obj.category,
               image: obj.image
          })
          mongoose.connect(DB_url).then(() => {
               product.save().then(() =>{
                    mongoose.disconnect()
                    resolve()
               })
          }).catch(err => {
               mongoose.disconnect()
               reject(err)
          })
     })
}