import express from "express";
import { loginDoctor } from "../controllers/doctorController.js";

const docRouter = express.Router();

docRouter.post("/login", loginDoctor);

export default docRouter;
