import express from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointment.js";

const registerUser = async (req, res) => {

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // validating email  
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    // validating password
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    const existedUser = await userModel.findOne({ email });


    if (existedUser) {
      return res.status(409).json({
        success: false,
        message: "User with email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword
    };


    const newUser = new userModel(userData);

    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token ,user});

  } catch (error) {

    console.log("error:", error);

    return res.json({ success: false, message: error.message });

  }
};

//api for login

const loginUser = async (req, res) => {

  try {
    const { email, password } = req.body;
    
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      
      return res.json({ success: true, token ,user});
    }
    else {

      return res.json({ success: false, message: "Invalid credentials" });
    }

  } catch (error) {
    console.log("error:", error);
    res.json({ success: false, message: error.message });
  }
}

//api for getting profile data

const getProfile = async (req, res) => {

  try {

    const { userId } = req.body;

    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });

  } catch (error) {
    console.log("error:", error);
    res.json({ success: false, message: error.message });
  }

}


//API TO UPDATE USER PROFILE

const updateProfile = async (req, res) => {

  try {
    const { userId, name, phone, address, dob, gender } = req.body;

    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    await userModel, findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender
    });

    if (imageFile) {
      const imgUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });

      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log("error:", error);
    res.json({ success: false, message: error.message });
  }
};

//api to book appointment

const bookAppointment = async (req, res) => {

  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor is not available" });
    }

    let slots_booked = docData.slots_booked;

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json(
          {
            success: false,
            message: "Slot not available"
          }
        );
      }
      else {
        slots_booked[slotDate].push(slotTime)
      }
    }
    else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log("error:", error);
    res.json({ success: false, message: error.message });
  }

}


//API to get all the appointments of the user

const listAppointments = async (req,res)=>{

  try {
    const { userId } = req.body;
    const appointments = await appointmentModel.find({ userId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
} 

//API to cancel appointment

const cancelAppointment =async (req,res) =>{

  try {
    
    const{ userId, appointmentId } = req.body;

    const appointmentData= await appointmentModel.findById(appointmentId);

    if(appointmentData.userId!==userId)
    {
      return res.json({ success: false ,  message: "Unauthorized action"});
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
  
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Cancelled" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  cancelAppointment,
};