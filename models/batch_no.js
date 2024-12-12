import mongoose from "mongoose";

const batch_no_schema = new mongoose.Schema({
    batch_no:{
        type:String
    }

},{versionKey:false})

const Batch_no = mongoose.model("Batch_no",batch_no_schema);

export default Batch_no;