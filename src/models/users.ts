import { Schema, model } from "mongoose";
import { IUser } from "../types/interfaces";

const userSchema = new Schema<IUser>({
    id:{
        type:String,
        required: true,
        unique: true
    },
    photo:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    startDate:{
        type: String,
        required: true,
    },
    jobDescription:{
        type: String,
        required: true,
    },
    state:{
        type: String,
        enum: ["ACTIVE", "INACTIVE"],
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    position:{
        type: String,
        required: true,
    },
})

const User = model("User", userSchema);

export {User, IUser}