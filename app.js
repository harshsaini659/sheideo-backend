const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./config/db')
connectDB()
const authRoutes = require('./routes/authRoutes')

const app =express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/api/auth', authRoutes)  //router-level middleware

app.get('/',(req,res)=>{
    res.send('Sheideo application is running')
})

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server is running on localhost:${PORT}`)
})