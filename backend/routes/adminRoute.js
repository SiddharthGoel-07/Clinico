import express from "express";
import { addDoctor, allDoctors, appointmentlist } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js"; 

const adminRouter=express.Router();

adminRouter.post("/add-doctor",upload.single("image"),addDoctor);
adminRouter.get("/all-doctors",allDoctors);
adminRouter.get("/all-appointments",appointmentlist);

export default adminRouter;