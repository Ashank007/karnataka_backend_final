import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
import ConnectDb from "./config/database.js"
import superadminrouter from "./routes/superadmin.routes.js";
import ppttrainerrouter from "./routes/trainer_ppt.routes.js";
import cors from "cors"
import bpettrainerrouter from "./routes/trainer_bpet.routes.js";
import batch_no_router from "./routes/batch_no.routes.js";
dotenv.config();
const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
ConnectDb();
app.get("/",(req,res)=>{
    res.send("<h1>Backend Server is Running<\h1>");
})
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use("/api/v1/trainer_ppt", ppttrainerrouter);
app.use("/api/v1/trainer_bpet", bpettrainerrouter);
app.use("/api/v1/superadmin", superadminrouter);
app.use("/api/v1/batchno", batch_no_router);
export default app;

