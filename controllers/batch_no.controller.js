import ApiResponse from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js"
import Batch_No from "../models/batch_no.js"

const create_batchno = async (req, res) => {
    try {
        const { batch_no } = req.body;
        if (!batch_no) {
            return res.status(new ApiResponse(false, "Batch Number is required"));
        }
        const batch = await Batch_No.findOne({
            batch_no:batch_no
        })
        if(batch){
            return res.status(400).json(new ApiResponse(false,"Batch Number Already Created"));
        }
        await Batch_No.create({
            batch_no: batch_no
        })
        res.status(201).json(new ApiResponse(true, "Batch No Created Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const get_batchno = async (req, res) => {
    try {
        const batches = await Batch_No.find().select('batch_no -_id');
        const batchNumbers = batches.map(b => b.batch_no);
        res.status(200).json(new ApiResponse(true, batchNumbers));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const delete_batchno = async (req, res) => {
    try {
        const { batch_no } = req.body;
        if (!batch_no) {
            return res.status(new ApiResponse(false, "Batch Number is required"));
        }
        const batch = await Batch_No.findOne({
            batch_no: batch_no
        })
        if (!batch) {
            return res.status(404).json(new ApiResponse(false, "Batch Number not Found"));
        }
        await batch.deleteOne();
        res.status(200).json(new ApiResponse(true, "Batch Number is Deleted"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const edit_batchno = async (req, res) => {
    try {
        const { batch_no, new_batch_no } = req.body;
        if (!batch_no) {
            return res.status(new ApiResponse(false, "Batch Number is required"));
        }
        const batch = await Batch_No.findOne({
            batch_no: batch_no
        })
        if(!batch){
            return res.status(404).json(new ApiResponse(false,"Batch Number not Found"));
        }
        batch.batch_no = new_batch_no;
        await batch.save();
        res.status(200).json(new ApiResponse(true, "Batch Number Updated Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
export { create_batchno, get_batchno, delete_batchno, edit_batchno };