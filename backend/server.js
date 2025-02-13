import express from "express";
import cors from "cors";
import 'dotenv/config'
import  {connectDB}  from "./config/mongodb.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctoreRoute.js";
import userRouter from "./routes/userRoute.js";
 
// app config

const app = express();
const port = process.env.PORT || 4000;
connectDB();

// middleware
app.use(express.json());
app.use(cors());

// api end points
app.use('/api/admin',adminRouter);
app.use('/api/doctor',doctorRouter);
app.use('/api/user',userRouter);

//localhost:4000/api/admin/add-doctor
app.get('/',(req,res)=>{
    res.send('Api working')
})


app.listen(port,()=>{
    console.log('server run port',port);
})
