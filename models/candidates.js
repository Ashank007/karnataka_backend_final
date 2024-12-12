import mongoose from "mongoose";

const CandidatesSechma = new mongoose.Schema({
    Name: {
        type: String
    },
    Email: {
        type: String
    },
    Password: {
        type: String
    },
    Age: {
        type: Number
    },
    Address: {
        type: String
    },
    Phoneno: {
        type: String
    },
    ChestNo: {
        type: Number
    },
    BatchNo: {
        type: Number
    },
    Bpte5kmrun: {
        type: Number
    },
    Bpet5kmrunPts: {
        type: Number
    },
    BpetVrope: {
        type: Number
    },
    BpetVropePts: {
        type: Number
    },
    BpetHrope: {
        type: Number
    },
    BpetHropePts: {
        type: Number
    },
    Bpet100mfmlrun: {
        type: Number
    },
    Bpet100mfmlrunPts: {
        type: Number
    },
    Bpet9feetditch: {
        type: String
    },
    Pptrun: {
        type: Number
    },
    PptrunPts: {
        type: Number
    },
    PptchinUps: {
        type: Number
    },
    PptchinUpsPts: {
        type: Number
    },
    Ppt5mshuttle: {
        type: Number
    },
    Ppt5mshuttlePts: {
        type: Number
    },
    Pptpushups: {
        type: Number
    },
    PptpushupsPts: {
        type: Number
    },
    Pptsitups: {
        type: Number
    },
    PptsitupsPts: {
        type: Number
    },
    Ppt100msprint: {
        type: Number
    },
    Ppt100msprintPts: {
        type: Number
    },
    TotalPts_ppt: {
        type: Number
    },
    TotalPts_bpet: {
        type: Number
    },
    Result_ppt: {
        type: String,
        enum: ['Good', 'Fail', 'Excellent','Sat']
    },
    Result_bpet: {
        type: String,
        enum: ['Good', 'Fail', 'Excellent','Sat']
    }
}, { versionKey: false });

const Candidate = mongoose.model("Candidate", CandidatesSechma);

export default Candidate;