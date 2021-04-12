const express = require('express')
const path = require('path')
const session = require('express-session')
const SessionStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')

const homeRouter = require('./routes/home.route')
const productRouter = require('./routes/products.route')
const authRouter = require('./routes/auth.route')
const cartRouter = require('./routes/cart.route')
const cartOrders = require('./routes/orders.route')
const adminRouter = require('./routes/admin.route')


const { connect } = require('mongodb')
const { mongo } = require('mongoose')
const { setegid } = require('process')

const app = express()

app.use(flash())

const STORE = new SessionStore({
     uri: 'mongodb://localhost:27017/online-shop',
     collection: 'sessions'
})

app.use(session({
     secret:'we are the champion you cant guess this loser hahaha',
     saveUninitialized: false,
     store: STORE
}))

app.use(express.static(path.join(__dirname,'assets')))
app.use(express.static(path.join(__dirname,'images')))

app.set('view engine','ejs')
app.set('views','views')//default
  
 
 
app.use('/',homeRouter) 
app.use('/',authRouter) 
app.use('/products',productRouter) 
app.use('/cart',cartRouter) 
app.use('/orders',cartOrders)
app.use('/admin',adminRouter)

app.listen(3000,(err) => {
     console.log(err)
     console.log('Server listening on 3000')
}) 
 