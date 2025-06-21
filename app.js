const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./config/db')
connectDB()
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const storeRoutes = require('./routes/storeRoutes')

const app =express()

app.use(cors()) // enable CORS, that is also a middleware
app.use(express.json()) // body parser middleware
app.use(morgan('dev')) // logging middleware
app.use('/api/auth', authRoutes)  //router-level middleware
app.use('/api/products', productRoutes) //router-level middleware
app.use('/api/seller', storeRoutes) //router-level middleware

app.get('/',(req,res)=>{
    res.send('Sheideo application is running')
})

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server is running on localhost:${PORT}`)
})