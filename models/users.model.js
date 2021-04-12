const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const DB_url = 'mongodb://localhost:27017/online-shop'


const userSchema = mongoose.Schema({
     username: String,
     email: String,
     password: String,
     isAdmin: {
          type: Boolean,
          default: false
     }
}) 

const User = mongoose.model('user',userSchema)

exports.checkUsernameExsist = (username) => {
     //console.log('username: ' + username )
     //check if username exsists
     return new Promise((resolve,reject) =>{
          mongoose.connect(DB_url).then( () => {
               User.count({
                         username:username
               }).then(cnt =>{
                    mongoose.disconnect()
                    resolve(cnt)
               })
          }).catch(err => {
               mongoose.disconnect()
               reject(err)
          })
     })
}
exports.checkEmailExsist = (email) => {
     //console.log('email:' + email)
     //check if email exsists
     return new Promise((resolve,reject) =>{
          mongoose.connect(DB_url).then( () => {
               User.count({
                         email:email
               }).then(cnt =>{
                    mongoose.disconnect()
                    resolve(cnt)
               })
          }).catch(err => {
               mongoose.disconnect()
               reject(err)
          })
     })
}

exports.addUser = (username,email,pass) => {
     // hash password
     let pas = bcrypt.hashSync(pass,10)
     //create new user
     let user = new User({
          username : username,
          email: email,
          password: pas
     })
     //save user
     return new Promise((resolve,reject) =>{  
          mongoose.connect(DB_url).then(() =>{
               user.save(function(err,usr){
                    if(err)return console.log(err)
                    mongoose.disconnect()   
                    resolve(usr)    
               })    
          }).catch(err => {
               mongoose.disconnect()
               reject(err)
          })
     })   
}
  

exports.login = (username,password) => {

     //check userame
     return new Promise((resolve,reject) =>{
          mongoose.connect(DB_url).then( () =>{
               User.findOne({
                    username: username
               }).then((usr) =>{
                    mongoose.disconnect()
                    if(!usr){
                         mongoose.disconnect()
                         reject('Username incorrect!')
                    }else{
                         if(!bcrypt.compareSync(password,usr.password)){
                              mongoose.disconnect()
                              reject('Password incorrect!')
                         }else{
                              mongoose.disconnect()
                              resolve({
                                   id: usr._id,
                                   isAdmin: usr.isAdmin
                              })
                         }
                    }
               })
          }).catch(err => {
               mongoose.disconnect()
               reject(err)
          })
     })


}
  