import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://anand:7897702902@cluster0.clg5dnz.mongodb.net/prescripto')
    .then(()=>console.log("DB connected"));
}

