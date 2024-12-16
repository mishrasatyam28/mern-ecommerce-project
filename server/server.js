
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv').config()

// routes
const authRouter = require('./routes/auth/auth-routes')

mongoose.connect(`${process.env.MONGO_URI}`)
.then(()=>{
    console.log('MongoDB Connected')  
})
.catch((error)=>{
    console.log(error)
})

const app = express();
const PORT = process.env.PORT || 5000


app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "DELETE", "PUT"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],
      credentials: true,
    })
  );
  

app.use(cookieParser());
app.use(express.json());

// routes
app.use('/api/auth', authRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

