import ApiResponse from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js"
import Trainer from "../models/trainer.js"
import Candidate from "../models/candidates.js"
import GenerateToken from "../utils/token_generation.js"
import bcrypt from "bcrypt"
import { Parser } from "json2csv"

const register = async (req, res) => {
    try {
        const { name, email, password, phoneno } = req.body;
        if (!name || !email || !password || !phoneno) {
            return res.status(400).json(new ApiResponse(false, "Name,Email,PhoneNo and Password is required"));
        }
        const trainer = await Trainer.findOne({
            email: email
        })
        if (trainer) {
            return res.status(400).json(new ApiResponse(false, "User Already Registered"));
        }
        const hasedpassword = await bcrypt.hash(password, 10);
        const newtrainer = await Trainer.create({
            name: name,
            email: email,
            password: hasedpassword,
            phoneno: phoneno
        })
        res.status(201).json(new ApiResponse(true, "Registered Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json(new ApiResponse(false, "Email and Password is required"));
        }
        const trainer = await Trainer.findOne({
            email: email
        })
        if (!trainer) {
            return res.status(400).json(new ApiResponse(false, "Register First"));
        }
        const ismatched = await bcrypt.compare(password, trainer.password);
        if (!ismatched) {
            return res.status(400).json(new ApiResponse(false, "Invalid Password"));
        }
        const token = GenerateToken(trainer._id);
        res.status(200).json(new ApiResponse(true, token));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const getcsv_ppt = async (req, res) => {
    try {
        const { batchNo } = req.body;
        if (!batchNo) {
            return res.status(400).json(new ApiResponse(false, "Batch Number is Required"));
        }
        const candidates = await Candidate.find({ BatchNo: batchNo }).lean().select("-Address -Password -Phoneno -_id");
        if (candidates.length === 0) {
            return res.status(400).json(new ApiResponse(false, "No candidates found"));
        }
        const numberarray = [];
        for (let i = 1; i <= candidates.length; i++) {
            numberarray.push(i);
        }
        const candidatesWithSNo = candidates.map((candidate, index) => ({
            SNo: numberarray[index],
            ...candidate
        }));
        const fields = [
            { label: 'S No', value: 'SNo' },
            { label: 'Chest No', value: 'ChestNo' },
            { label: 'Name', value: 'Name' },
            { label: 'Age', value: 'Age' },
            { label: '2.4 Km Run \n(Time)', value: 'Pptrun' },
            { label: '2.4 Km Run \n(Pts)', value: 'PptrunPts' },
            { label: 'ChinUps \n(Count)', value: 'PptchinUps' },
            { label: 'ChinUps \n(Pts)', value: 'PptchinUpsPts' },
            { label: '5m Shuttle \n(Count)', value: 'Ppt5mshuttle' },
            { label: '5m Shuttle \n(Pts)', value: 'Ppt5mshuttlePts' },
            { label: 'Pushups \n(Count)', value: 'Pptpushups' },
            { label: 'Pushups \n(Pts)', value: 'PptpushupsPts' },
            { label: 'Situps \n(Count)', value: 'Pptsitups' },
            { label: 'Situps \n(Pts)', value: 'PptsitupsPts' },
            { label: '100m Sprint \n(Time)', value: 'Ppt100msprint' },
            { label: '100m Sprint \n(Pts)', value: 'Ppt100msprintPts' },
            { label: 'Total Pts', value: 'TotalPts_ppt' },
            { label: 'RESULT', value: 'Result_ppt' }
        ];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(candidatesWithSNo);
        res.header('Content-Type', 'text/csv');
        res.attachment(`${batchNo}_ppt.csv`);
        res.send(csv);
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const calculatefinalresult_ppt = async (req, res) => {
    try {
        const { BatchNo } = req.body;
        const candidates = await Candidate.find({ BatchNo: BatchNo });
        for (let i = 0; i < candidates.length; i++) {
            const candidate = candidates[i];
            let marks = candidate.Ppt100msprintPts + candidate.Ppt5mshuttlePts + candidate.PptchinUpsPts + candidate.PptpushupsPts + candidate.PptrunPts + candidate.PptsitupsPts;
            if (candidate.Result_ppt == null) {
                if (marks > 24) candidate.Result_ppt = "Excellent";
                else if (marks >= 19 && marks <= 23) candidate.Result_ppt = "Good";
                else if (marks > 13 && marks <= 18) candidate.Result_ppt = "Sat";
                else candidate.Result_ppt = "Fail";
                candidate.TotalPts_ppt = marks;
            }
            await candidate.save();
        }
        res.status(200).json(new ApiResponse(true, "Final Result Updated Successfully"))
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const getcsv_bpet = async (req, res) => {
    try {
        const { batchNo } = req.body;
        if (!batchNo) {
            return res.status(400).json(new ApiResponse(false, "Batch Number is Required"));
        }
        const candidates = await Candidate.find({ BatchNo: batchNo }).lean().select("-Address -Password -Phoneno -_id");
        if (candidates.length === 0) {
            return res.status(400).json(new ApiResponse(false, "No candidates found"));
        }
        const numberarray = [];
        for (let i = 1; i <= candidates.length; i++) {
            numberarray.push(i);
        }
        const candidatesWithSNo = candidates.map((candidate, index) => ({
            SNo: numberarray[index],
            ...candidate
        }));
        const fields = [
            { label: 'S No', value: 'SNo' },
            { label: 'Chest No', value: 'ChestNo' },
            { label: 'Name', value: 'Name' },
            { label: 'Age', value: 'Age' },
            { label: '5 Km Run \n(Time)', value: 'Bpte5kmrun' },
            { label: '5 Km Run \n(Pts)', value: 'Bpet5kmrunPts' },
            { label: 'H Rope \n(Count)', value: 'BpetHrope' },
            { label: 'H Rope \n(Pts)', value: 'BpetHropePts' },
            { label: 'V Rope \n(Count)', value: 'BpetVrope' },
            { label: 'V Rope \n(Pts)', value: 'BpetVropePts' },
            { label: '9 Ft Ditch \n(Count)', value: 'Bpet9feetditch' },
            { label: '100m FML Run \n(Count)', value: 'Bpet100mfmlrun' },
            { label: '100m FML Run \n(Pts)', value: 'Bpet100mfmlrunPts' },
            { label: 'Total Pts', value: 'TotalPts_bpet' },
            { label: 'RESULT', value: 'Result_bpet' }
        ];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(candidatesWithSNo);
        res.header('Content-Type', 'text/csv');
        res.attachment(`${batchNo}_bpet.csv`);
        res.send(csv);
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const calculatefinalresult_bpet = async (req, res) => {
    try {
        const { BatchNo } = req.body;
        const candidates = await Candidate.find({ BatchNo: BatchNo });
        for (let i = 0; i < candidates.length; i++) {
            const candidate = candidates[i];
            let marks = candidate.Bpet5kmrunPts + candidate.BpetVropePts + candidate.BpetHropePts + candidate.Bpet100mfmlrunPts;
            if (candidate.Result_bpet == null) {
                if (marks > 24) candidate.Result_bpet = "Excellent";
                else if (marks >= 19 && marks <= 23) candidate.Result_bpet = "Good";
                else if (marks > 13 && marks <= 18) candidate.Result_bpet = "Sat";
                else candidate.Result_bpet = "Fail";
                candidate.TotalPts_bpet = marks;
            }
            await candidate.save();
        }
        res.status(200).json(new ApiResponse(true, "Final Result Updated Successfully"))
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
export { register, login, getcsv_ppt, calculatefinalresult_ppt, getcsv_bpet, calculatefinalresult_bpet };