import mongoose from "mongoose";

const connectDB= async()=>{
   
    try {
        
        const conn=await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("✅ Connected to MongoDB Atlas"))
        
    } catch (error) {
        console.log("conn failed",error);
    }
    
}

export default connectDB;