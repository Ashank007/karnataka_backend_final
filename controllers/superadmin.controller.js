import ApiResponse from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js"
import Candidate from "../models/candidates.js"
import Trainer from "../models/trainer.js"
import SuperAdmin from "../models/superadmin.js"
import bcrypt from "bcrypt"
import GenerateToken from "../utils/token_generation.js"
const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json(new ApiResponse(false, "Email and Password is required"));
        }
        const superadmin = await SuperAdmin.findOne({
            email: email
        })
        if (superadmin) {
            return res.status(400).json(new ApiResponse(false, "User Already Registered"));
        }
        const hasedpassword = await bcrypt.hash(password, 10);
        const newsuperadmin = await SuperAdmin.create({
            email: email,
            password: hasedpassword
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
        const superadmin = await SuperAdmin.findOne({
            email: email
        })
        if (!superadmin) {
            return res.status(400).json(new ApiResponse(false, "Register First"));
        }
        const ismatched = await bcrypt.compare(password, superadmin.password);
        if (!ismatched) {
            return res.status(400).json(new ApiResponse(false, "Invalid Password"));
        }
        const token = GenerateToken(superadmin._id);
        res.status(200).json(new ApiResponse(true, token));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const getallcandidates = async (req, res) => {
    try {
        const { BatchNo } = req.body;
        const candidates = await Candidate.find({ BatchNo: BatchNo });
        if (!candidates) {
            return res.status(400).json(new ApiResponse(false, "No Candidate Found"));
        }
        const data = []
        for (let i = 0; i < candidates.length; i++) {
            const usefull = {
                BatchNo: candidates[i].BatchNo,
                Name: candidates[i].Name,
                Email: candidates[i].Email,
                Address: candidates[i].Address,
                ChestNo: candidates[i].ChestNo,
                Age: candidates[i].Age
            }
            data.push(usefull);
        }
        return res.status(200).json(new ApiResponse(true, data));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const getalltrainer = async (req, res) => {
    try {
        const trainers = await Trainer.find();
        if (!trainers) {
            return res.status(400).json(new ApiResponse(false, "No Trainers Found"));
        }
        const data = []
        for (let i = 0; i < trainers.length; i++) {
            const usefull = {
                batch_alloted: trainers[i].batch_alloted,
                Name: trainers[i].name,
                Email: trainers[i].email,
            }
            data.push(usefull);
        }
        return res.status(200).json(new ApiResponse(true, data));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const assignchestno = async (req, res) => {
    try {
        const { email, chestno } = req.body;
        const candidate = await Candidate.findOne({
            Email: email,
        })
        if (!candidate) {
            return res.status(404).json(new ApiResponse(false, "Candidate Not Found"));
        }
        if (candidate.ChestNo == null) {
            candidate.ChestNo = chestno;
            await candidate.save();
        }
        else {
            return res.status(400).json(new ApiResponse(false, "Chest No Assigned Already"));
        }
        res.status(200).json(new ApiResponse(true, "Chest No Assigned Successfully"))
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const addtrainer = async (req, res) => {
    try {
        const { name, email, password, phoneno, batchno } = req.body;
        if (!name || !email || !password || !phoneno || !batchno) {
            return res.status(400).json(new ApiResponse(false, "Name,Email,PhoneNo,Password and Batchno is required"));
        }
        const trainer = await Trainer.findOne({
            email: email
        })
        if (trainer) {
            return res.status(400).json(new ApiResponse(false, "Trainer Already Registered"));
        }
        const hasedpassword = await bcrypt.hash(password, 10);
        const newtrainer = await Trainer.create({
            name: name,
            email: email,
            password: hasedpassword,
            phoneno: phoneno,
            batch_alloted: batchno
        })
        res.status(201).json(new ApiResponse(true, "Trainer Added Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const edittrainer = async (req, res) => {
    try {
        const { name, email, batch_alloted } = req.body;
        if (!email || !name || !batch_alloted) {
            return res.status(400).json(new ApiResponse(false, "Email, Name and Batch_Alloted are Required"));
        }
        const trainer = await Trainer.findOne({
            email: email
        });
        if (!trainer) {
            return res.status(404).json(new ApiResponse(false, "Invalid Email Id, Trainer not Found"));
        }
        trainer.batch_alloted = batch_alloted;
        trainer.name = name;
        await trainer.save();
        res.status(200).json(new ApiResponse(true, "Trainer Updated Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const deletetrainer = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json(new ApiResponse(false, "Email is Required"));
        }
        const trainer = await Trainer.findOne({
            email: email
        })
        if (!trainer) {
            return res.status(404).json(new ApiResponse(false, "Invalid Email Id, Trainer not Found"));
        }
        await trainer.deleteOne()
        res.status(200).json(new ApiResponse(true, "Trainer Deleted Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const gettrainer = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json(new ApiResponse(false, "Email Id is Required"));
        }
        const trainer = await Trainer.findOne({
            email: email
        })
        if (!trainer) {
            return res.status(404).json(new ApiResponse(false, "Invalid Email Id, Trainer Not Found"));
        }
        const data = {
            name: trainer.name,
            email: trainer.email,
            phoneno: trainer.phoneno,
            batch_alloted: trainer.batch_alloted
        }
        res.status(200).json(new ApiResponse(true, data))
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const addcandidate = async (req, res) => {
    try {
        const { BatchNo, name, address, phoneno, email, password, Age } = req.body;
        if (!BatchNo || !name || !address || !phoneno || !email || !password || !Age) {
            return res.status(400).json(new ApiResponse(false, "BatchNo,Name,Address,Phoneno,Email,Age and Password is required"));
        }
        const candidate = await Candidate.findOne({
            Email: email
        });
        if (candidate) {
            return res.status(400).json(new ApiResponse(false, "Candidate Already Registered"));
        }
        const hasedpassword = await bcrypt.hash(password, 10);
        const newcandidate = await Candidate.create({
            Name: name,
            Email: email,
            Password: hasedpassword,
            Address: address,
            Phoneno: phoneno,
            BatchNo: BatchNo,
            Age: Age
        });
        res.status(201).json(new ApiResponse(true, "Candidate Added Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const editcandidate = async (req, res) => {
    try {
        const { name, email, chestno, batchNo, age } = req.body;
        if (!name || !email || !chestno || !batchNo || !age) {
            return res.status(400).json(new ApiResponse(false, "Name, Email, Chestno, Batchno and Age is Required"));
        }
        const candidate = await Candidate.findOne({
            Email: email
        });
        if (!candidate) {
            return res.status(404).json(new ApiResponse(false, "Invalid Email Id, Candidate not Found"));
        }
        candidate.Name = name;
        candidate.Email = email;
        candidate.ChestNo = chestno;
        candidate.BatchNo = batchNo;
        candidate.Age = age;
        await candidate.save();
        res.status(200).json(new ApiResponse(true, "Candidate Updated Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const deletecandidate = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json(new ApiResponse(false, "Email is Required"));
        }
        const result = await Candidate.deleteOne({
            Email: email
        });
        
        if (result.deletedCount === 0) {
            return res.status(404).json(new ApiResponse(false, "Invalid Email Id, Candidate not Found"));
        }
        
        res.status(200).json(new ApiResponse(true, "Candidate Deleted Successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
const getcandidate = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json(new ApiResponse(false, "Email Id is Required"));
        }
        const candidate = await Candidate.findOne({
            Email: email
        })
        if (!candidate) {
            return res.status(404).json(new ApiResponse(false, "Invalid Email Id, Candidate Not Found"));
        }
        const data = {
            name: candidate.Name,
            email: candidate.Email,
            phoneno: candidate.Phoneno,
            chestno: candidate.ChestNo,
            batchno: candidate.BatchNo,
            age: candidate.Age
        }
        res.status(200).json(new ApiResponse(true, data))
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}
export {
    register, login, getallcandidates, getalltrainer, assignchestno, addtrainer, edittrainer, deletetrainer,
    gettrainer, addcandidate, editcandidate, deletecandidate, getcandidate
};