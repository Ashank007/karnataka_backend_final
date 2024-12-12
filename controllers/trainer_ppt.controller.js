import ApiResponse from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js"
import Candidate from "../models/candidates.js";
const Pptkmrun = async (req, res) => {
    try {
        const { BatchNo, ChestNumbers, Score } = req.body;
        if (!BatchNo || !ChestNumbers || !Score) {
            return res.status(400).json(new ApiResponse(false, "BatchNo,ChestNumbers and Score are required"));
        }
        let marks = 0;
        const candidates = await Candidate.find({ BatchNo: BatchNo });
        for (let i = 0; i < candidates.length; i++) {
            const candidate = candidates[i];
            if (candidate.Age >= 40) {
                if (Score[i] > 0 && Score[i] <= 11.3) marks = 5;
                else if (Score[i] > 11.3 && Score[i] <= 12) marks = 4;
                else if (Score[i] > 12 && Score[i] <= 12.3) marks = 3;
                else if (Score[i] > 12.3 && Score[i] <= 13) marks = 2;
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                } 
            }
            else if (candidate.Age >= 30 && candidate.Age < 40) {
                if (Score[i] > 0 && Score[i] <= 10.3) marks = 5;
                else if (Score[i] > 10.3 && Score[i] <= 11) marks = 4;
                else if (Score[i] > 11 && Score[i] <= 11.3) marks = 3;
                else if (Score[i] > 11.3 && Score[i] <= 12) marks = 2;
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                } 
            }
            else {
                if (Score[i] > 0 && Score[i] <= 9) marks = 5;
                else if (Score[i] > 9 && Score[i] <= 9.3) marks = 4;
                else if (Score[i] > 9.3 && Score[i] <= 10) marks = 3;
                else if (Score[i] > 10 && Score[i] <= 10.3) marks = 2;
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                } 
            }
            candidate.Pptrun = Score[i];
            candidate.PptrunPts = marks;
            await candidate.save();
        }
        res.status(200).json(new ApiResponse(true, "PPT Kmrun Updated Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const Pptchinups = async (req, res) => {
    try {
        const { BatchNo, ChestNumbers, Score } = req.body;
        if (!BatchNo || !ChestNumbers || !Score) {
            return res.status(400).json(new ApiResponse(false, "BatchNo,ChestNumbers and Score are required"));
        }
        let marks = 0;
        const candidates = await Candidate.find({ BatchNo: BatchNo });
        for (let i = 0; i < candidates.length; i++) {
            const candidate = candidates[i];
            if (candidate.Age >= 40) {
                if (Score[i] >= 9) marks = 5;
                else if (Score[i] >= 6) marks = 4;
                else if (Score[i] >= 5) marks = 3;
                else if (Score[i] >= 4) marks = 2;
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                } 

            } else if (candidate.Age >= 30 && candidate.Age < 40) {
                if (Score[i] >= 13) marks = 5;
                else if (Score[i] >= 9) marks = 4;
                else if (Score[i] >= 7) marks = 3;
                else if (Score[i] >= 5) marks = 2;
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                } 

            } else {
                if (Score[i] >= 15) marks = 5;
                else if (Score[i] >= 10) marks = 4;
                else if (Score[i] >= 8) marks = 3;
                else if (Score[i] >= 6) marks = 2;
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                } 
            }
            candidate.PptchinUps = Score[i];
            candidate.PptchinUpsPts = marks;
            await candidate.save();
        }
        res.status(200).json(new ApiResponse(true, "PPT Chinups Updated Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const Ppt5mShuttle = async (req, res) => {
    try {
        const { BatchNo, ChestNumbers, Score } = req.body;
        if (!BatchNo || !ChestNumbers || !Score) {
            return res.status(400).json(new ApiResponse(false, "BatchNo,ChestNumbers and Score are required"));
        }
        let marks = 0;
        const candidates = await Candidate.find({ BatchNo: BatchNo });
        for (let i = 0; i < candidates.length; i++) {
            const candidate = candidates[i];
            if (candidate.Age >= 40) {
                if (Score[i] >= 13) marks = 4;
                else if (Score[i] >= 12 && Score[i] < 13) marks = 3;
                else if (Score[i] >= 11 && Score[i] < 12) marks = 2;
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                } 
            }
            else if (candidate.Age >= 30 && candidate.Age < 40) {
                if (Score[i] >= 15) marks = 4;
                else if (Score[i] >= 14 && Score[i] < 15) marks = 3;
                else if (Score[i] >= 13 && Score[i] < 14) marks = 2;
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                } 
            }
            else {
                if (Score[i] >= 17) marks = 4;
                else if (Score[i] >= 16 && Score[i] < 17) marks = 3;
                else if (Score[i] >= 15 && Score[i] < 16) marks = 2;
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                } 
            }
            candidate.Ppt5mshuttle = Score[i];
            candidate.Ppt5mshuttlePts = marks;
            await candidate.save();
        }
        res.status(200).json(new ApiResponse(true, "PPT 5m Shuttle Updated Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const Pptpushups = async (req, res) => {
    try {
        const { BatchNo, ChestNumbers, Score } = req.body;
        if (!BatchNo || !ChestNumbers || !Score) {
            return res.status(400).json(new ApiResponse(false, "BatchNo,ChestNumbers and Score are required"));
        }
        let marks = 0;
        const candidates = await Candidate.find({ BatchNo: BatchNo });
        for (let i = 0; i < candidates.length; i++) {
            const candidate = candidates[i];
            if (candidate.Age >= 40) {
                if (Score[i] >= 25) marks = 4;
                else if (Score[i] >= 20 && Score[i] < 25) marks = 3;
                else if (Score[i] >= 15 && Score[i] < 20) marks = 2;
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                } 
            }
            else if (candidate.Age >= 30 && candidate.Age < 40) {
                if (Score[i] >= 35) marks = 4;
                else if (Score[i] >= 30 && Score[i] < 35) marks = 3;
                else if (Score[i] >= 25 && Score[i] < 30) marks = 2;
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                } 
            }
            else {
                if (Score[i] >= 40) marks = 4;
                else if (Score[i] >= 35 && Score[i] < 40) marks = 3;
                else if (Score[i] >= 30 && Score[i] < 35) marks = 2;
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                } 
            }
            candidate.Pptpushups = Score[i];
            candidate.PptpushupsPts = marks;
            await candidate.save();
        }
        res.status(200).json(new ApiResponse(true, "PPT Pushups Updated Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const Pptsitups = async (req, res) => {
    try {
        const { BatchNo, ChestNumbers, Score } = req.body;
        if (!BatchNo || !ChestNumbers || !Score) {
            return res.status(400).json(new ApiResponse(false, "BatchNo,ChestNumbers and Score are required"));
        }
        let marks = 0;
        const candidates = await Candidate.find({ BatchNo: BatchNo });
        for (let i = 0; i < candidates.length; i++) {
            const candidate = candidates[i];
            if (candidate.Age >= 40) {
                if (Score[i] >= 25) marks = 4;
                else if (Score[i] >= 20 && Score[i] < 25) marks = 3;
                else if (Score[i] >= 15 && Score[i] < 20) marks = 2;
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                } 
            }
            else if (candidate.Age >= 30 && candidate.Age < 40) {
                if (Score[i] >= 35) marks = 4;
                else if (Score[i] >= 30 && Score[i] < 35) marks = 3;
                else if (Score[i] >= 25 && Score[i] < 30) marks = 2;
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                } 
            }
            else {
                if (Score[i] >= 40) marks = 4;
                else if (Score[i] >= 35 && Score[i] < 40) marks = 3;
                else if (Score[i] >= 30 && Score[i] < 35) marks = 2;
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                } 
            }
            candidate.Pptsitups = Score[i];
            candidate.PptsitupsPts = marks;
            await candidate.save();
        }
        res.status(200).json(new ApiResponse(true, "PPT Situps Updated Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const Ppt100msprint = async (req, res) => {
    try {
        const { BatchNo, ChestNumbers, Score } = req.body;
        if (!BatchNo || !ChestNumbers || !Score) {
            return res.status(400).json(new ApiResponse(false, "BatchNo,ChestNumbers and Score are required"));
        }
        let marks = 0;
        const candidates = await Candidate.find({ BatchNo: BatchNo });
        for (let i = 0; i < candidates.length; i++) {
            const candidate = candidates[i];
            if (candidate.Age >= 40) {
                if (Score[i] > 0 && Score[i] <= 17) marks = 4;
                else if (Score[i] > 17 && Score[i] <= 19) marks = 3;
                else if (Score[i] > 19 && Score[i] <= 21) marks = 2;
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                } 
            }
            else if (candidate.Age >= 30 && candidate.Age < 40) {
                if (Score[i] > 0 && Score[i] <= 15) marks = 4;
                else if (Score[i] > 15 && Score[i] <= 17) marks = 3;
                else if (Score[i] > 17 && Score[i] <= 19) marks = 2;
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                } 
            }
            else {
                if (Score[i] > 0 && Score[i] <= 13) marks = 4;
                else if (Score[i] > 13 && Score[i] <= 15) marks = 3;
                else if (Score[i] > 15 && Score[i] <= 17) marks = 2;
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                } 
            }
            candidate.Ppt100msprint = Score[i];
            candidate.Ppt100msprintPts = marks;
            await candidate.save();
        }
        res.status(200).json(new ApiResponse(true, "PPT 100m Sprint Updated Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
export { Pptkmrun, Pptchinups, Ppt5mShuttle, Pptpushups, Pptsitups, Ppt100msprint };