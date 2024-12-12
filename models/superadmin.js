import mongoose from "mongoose";

const SuperAdminScheme = new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    }

},{versionKey:false});

const SuperAdmin = mongoose.model("SuperAdmin",SuperAdminScheme);

export default SuperAdmin;