import validator from "validator";
import bcrypt from "bcrypt";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointment.js";
import userModel from "../models/userModel.js";
import path from "path";
import fs from "fs";
import cloudinary from "../config/cloudinary.js"; 


//api for adding doctor

const addDoctor =async(req, res) =>{
    try {
        const{
            name,
            email,
            password,
            speciality,
            degree,
            experience,
            about,
            fees,
            address
        } =req.body;

        const imageFile= req.file;
        
        if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if(!validator.isEmail(email))
    {
        return res.json(
         {
            success:false,
            message:"Please enter a valid email",
         }
        );
    }
     
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    const salt=await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password,salt);
    
    const cloudResult = await cloudinary.uploader.upload(imageFile.path, {
    folder:"doctors-images",
    });
     


    const doctorData= {
     name,
     email,
     image:cloudResult.secure_url,
     password:hashedPassword,
     speciality,
     degree,
     experience,
     about,
     fees,
     address:JSON.parse(address),
     date:Date.now()
    };

    const newDoc=new doctorModel(doctorData);
    await newDoc.save();
          
    res.json({success:true, message:"Docotr Added"});
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

//api to get all the doctors data 

const allDoctors = async(req,res)=>{
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//api to get all the appointments list

const appointmentlist =async(req,res) =>{
    try {
        const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
    } catch (error) {
         console.log(error);
    res.json({ success: false, message: error.message });
    }
}

//api for cnacellation of appointment
const appointmentCancel =async(req,res)=>{
try {
  const { appointmentId } =req.body
  await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

  res.json({success:true , message: 'Appointment cancelled'});
} catch (error) {
  console.log(error)
  res.json({ success: false, message: error.message })
}
}

export {
addDoctor,
allDoctors,
appointmentlist,
appointmentCancel
};