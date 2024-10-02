import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://anand:7897702902@cluster0.clg5dnz.mongodb.net/prescripto')//('mongodb+srv://anandmaurya816:<7897702902>@cluster0.1zl6l.mongodb.net/prescripto')
    .then(()=>console.log("DB connected"));
}



//mongodb+srv://anandmaurya816:888106@cluster0.q6fqr.mongodb.net/e-prescripto'
//mongodb+srv://anand:7897702902@cluster0.clg5dnz.mongodb.net/e-commerce