

//to login the doctor

import doctorModel from "../models/doctorModel";

const loginDoctor = async(req,res)=>{

    try {
        
        const { email, password }=req.body;

        console.log("checking");

        const user= await doctorModel.findOne({email})

        if(!user)
        {
            return res.json({success:false , message:"Invalid Credentials"})

        }

        const isMatch= await bcrypt.compare(password,user.password)

        if(isMatch)
        {
            const token =jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true, token})
        }
        else
        {
          res.json({success:false,  message:"Invalid Credentials"});
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// api to get doctor appointments for doctor panel