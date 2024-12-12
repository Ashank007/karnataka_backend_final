import ApiResponse from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js"
import Candidate from "../models/candidates.js";

const bpetkmrun = async (req, res) => {
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
                if (Score[i] > 0 && Score[i] <= 30) marks = 6;
                else if (Score[i] > 30 && Score[i] <= 31.3) marks = 5;
                else if (Score[i] > 31.3 && Score[i] <= 32) marks = 4;
                else if (Score[i] > 32 && Score[i] <= 33) marks = 3;
                else if (Score[i] > 33 && Score[i] <= 33.3) marks = 2;
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                }
            }
            else if (candidate.Age >= 30 && candidate.Age < 40) {
                if (Score[i] > 0 && Score[i] <= 27) marks = 6;
                else if (Score[i] > 27 && Score[i] <= 28.3) marks = 5;
                else if (Score[i] > 28.3 && Score[i] <= 29) marks = 4;
                else if (Score[i] > 29 && Score[i] <= 30) marks = 3;
                else if (Score[i] > 30 && Score[i] <= 30.3) marks = 2;
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                }
            }
            else {
                if (Score[i] > 0 && Score[i] <= 25) marks = 6;
                else if (Score[i] > 25 && Score[i] <= 26.3) marks = 5;
                else if (Score[i] > 26.3 && Score[i] <= 27) marks = 4;
                else if (Score[i] > 27 && Score[i] <= 28) marks = 3;
                else if (Score[i] > 28 && Score[i] <= 28.3) marks = 2;
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                }
            }
            candidate.Bpte5kmrun = Score[i];
            candidate.Bpet5kmrunPts = marks;
            await candidate.save();
        }
        res.status(200).json(new ApiResponse(true, "PPT Kmrun Updated Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}

const bpetVrope = async (req, res) => {
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
                if (Score[i] == 1) marks = 6;
                else if (Score[i] == 2) marks = 5;
                else if (Score[i] == 3) marks = 4
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                }
            }
            else if (candidate.Age >= 30 && candidate.Age < 40) {
                if (Score[i] == 1) marks = 6;
                else if (Score[i] == 2) marks = 5;
                else if (Score[i] == 3) marks = 4;
                else if (Score[i] == 4) marks = 3;
                else if (Score[i] == 5) marks = 2;
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                }
            }
            else {
                if (Score[i] == 1) marks = 6;
                else if (Score[i] == 2) marks = 5;
                else if (Score[i] == 3) marks = 4;
                else if (Score[i] == 4) marks = 3;
                else if (Score[i] == 3) marks = 2;
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                }
            }
            candidate.BpetVrope = Score[i];
            candidate.BpetVropePts = marks;
            await candidate.save();
        }
        res.status(200).json(new ApiResponse(true, "PPT Vrope Updated Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const bpetHrope = async (req, res) => {
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
                if (Score[i] == 3) marks = 5;
                else if (Score[i] == 2) marks = 4;
                else if (Score[i] == 1) marks = 3
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                }
            }
            else if (candidate.Age >= 30 && candidate.Age < 40) {
                if (Score[i] == 3) marks = 5;
                else if (Score[i] == 2) marks = 4;
                else if (Score[i] == 1) marks = 3
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                }
            }
            else {
                if (Score[i] == 3) marks = 5;
                else if (Score[i] == 2) marks = 4;
                else if (Score[i] == 1) marks = 3
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                }
            }
            candidate.BpetHrope = Score[i];
            candidate.BpetHropePts = marks;
            await candidate.save();
        }
        res.status(200).json(new ApiResponse(true, "PPT Hrope Updated Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const bpet100mFmlrun = async (req, res) => {
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
                if (Score[i] <= 32) marks = 5;
                else if (Score[i] > 32 && Score[i] <= 34) marks = 4;
                else if (Score[i] > 34 && Score[i] <= 36) marks = 3;
                else if (Score[i] > 36 && Score[i] <= 38) marks = 2;
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                }
            }
            else if (candidate.Age >= 30 && candidate.Age < 40) {
                if (Score[i] <= 32) marks = 5;
                else if (Score[i] > 32 && Score[i] <= 34) marks = 4;
                else if (Score[i] > 34 && Score[i] <= 36) marks = 3;
                else if (Score[i] > 36 && Score[i] <= 38) marks = 2;
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                }
            }
            else {
                if (Score[i] <= 32) marks = 5;
                else if (Score[i] > 32 && Score[i] <= 34) marks = 4;
                else if (Score[i] > 34 && Score[i] <= 36) marks = 3;
                else if (Score[i] > 36 && Score[i] <= 38) marks = 2;
                else {
                    candidate.Result_bpet = 'Fail';
                    marks = 0;
                }
            }
            candidate.Bpet100mfmlrun = Score[i];
            candidate.Bpet100mfmlrunPts = marks;
            await candidate.save();
        }
        res.status(200).json(new ApiResponse(true, "PPT 100mFmlrun Updated Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const bpet9Feetditch = async (req, res) => {
    try {
        const { BatchNo, ChestNumbers, Score } = req.body;
        if (!BatchNo || !ChestNumbers || !Score) {
            return res.status(400).json(new ApiResponse(false, "BatchNo,ChestNumbers and Score are required"));
        }
        const candidates = await Candidate.find({ BatchNo: BatchNo });
        for (let i = 0; i < candidates.length; i++) {
            const candidate = candidates[i];
            candidate.Bpet9feetditch = Score[i];
            if (Score[i] == 0) {
                candidate.Result_bpet = 'Fail';
            }
            await candidate.save();
        }
        res.status(200).json(new ApiResponse(true, "PPT 9feetditch Updated Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
export { bpetkmrun, bpetVrope, bpetHrope, bpet100mFmlrun, bpet9Feetditch };