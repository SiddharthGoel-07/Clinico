import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: {
        type: String,
        default:
            "https://res.cloudinary.com/du193zwbg/image/upload/avator_yzftlt.png",
    },
    address: { type: Object, default: { line1: "", line2: "" } },
    gender: { type: String, default: "Not selected" },
    dob: { type: String, default: "Not selected" },
    phone: { type: String, default: "000000000" },

});

const userModel = mongoose.model.user || mongoose.model("user", userSchema);

export default userModel;
