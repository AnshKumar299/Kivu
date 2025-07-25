const express= require('express');
const mongoose=require('mongoose');
const cors=require('cors')
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");
const transactionRoutes = require('./routes/transactionRoutes');

const app=express();
require('dotenv').config();

const PORT=process.env.PORT || 4000;

const connectDB= async()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI) 
        console.log('Mongo DB connected successfully')
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
}
connectDB();

app.use(
  cors({
    origin: [`http://localhost:5173`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());


app.listen(PORT,()=>{
    console.log('Server is active');
})

app.use('/api/auth',authRoute);
app.use('/api/transaction',transactionRoutes)