const usersModels = require('../models/users.model')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')


exports.getSignup = (req,res,next) => {
     let user = req.session.userId
     res.render('signup',{
          user: user,
          admin: false,
          pageName: 'Signup',
          err: req.flash("authErr")[0],
          valErr:req.flash('valErr')
     })
}


exports.postSignup = (req,res,next) => {
     let username = req.body.username
     let email = req.body.email
     let pass  = req.body.pass
     if(validationResult(req).isEmpty()){
          usersModels.checkUsernameExsist(username).then(cnt => {
               if(cnt === 0){
                    usersModels.checkEmailExsist(email).then(cntEmail => {
                         if(cntEmail !== 0 ){ 
                              req.flash('authErr','Email already used')
                              res.redirect('/signup')
                         }else{
                              usersModels.addUser(username,email,pass).then((usr) =>{
                                   // console.log(usr)
                                   res.redirect('/login')
                              })
                         }
                    })
               }else{
                    req.flash("authErr",'Username already exists')
                    res.redirect('/signup')
               }
          })
     }else{
          // console.log(validationResult(req).array())
          req.flash('valErr',validationResult(req).array())
          res.redirect('/signup')
     }  
}


exports.getLogin = (req,res,next) => {
     let user = req.session.userId
     res.render('login',{
          admin: false,
          user: user,
          pageName: 'Login',
          err: req.flash("authErr")[0],
          valErr:req.flash('valErr')
     }) 
}

 
exports.postLogin = (req,res,next) => {

     

     let username = req.body.username
     let pass = req.body.pass
     // console.log(username + " " + pass)
     // check if user is registered
     
     if(validationResult(req).isEmpty()){          
          usersModels.login(username,pass).then((info) => {
               req.session.userId = info.id
               req.session.isAdmin = info.isAdmin
               res.redirect('/')
          }).catch((err) =>{
               req.flash("authErr",err)
               res.redirect('/login')
          })
     }else{
          req.flash('valErr',validationResult(req).array())
          res.redirect('/login')
     }
}

exports.logout = (req,res,next) => {
     // console.log('logout')
     req.session.destroy(() => {
          res.redirect('/')
     })
}