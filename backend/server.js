import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/usersRoute.js";
import adminRouter from "./routes/adminRoute.js";
import docRouter from "./routes/docRoute.js";

const app= express();

const port=process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use(cors());


app.use("/api/user",userRouter);
app.use("/api/admin",adminRouter);
app.use("/api/doctor", docRouter);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


app.get("/", (req, res) => {
  res.send("Hello I am working Dude 😎");
});