import mongoose from "mongoose";

const TrainerSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    batch_alloted:{
        type:String
    }
},{versionKey:false});

const Trainer = mongoose.model("Trainer",TrainerSchema);

export default Trainer;