//PATHS
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
//utils
import connectDB from './config/db.js'
//routes
import UserRoutes from './routes/UserRoutes.js'
import donorRoutes from './routes/donorRoutes.js'

dotenv.config()
const port= process.env.PORT || 5000

connectDB()

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api/bb/user',UserRoutes)
app.use('/api/bb/donors',donorRoutes)


app.listen(port , ()=>{
    console.log(`Server Connected Successfully 🚀 running on ${port}`)
})
export default function handler(req, res) {
    app(req, res);
  }
