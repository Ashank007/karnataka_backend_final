import express from "express";
import { register, login, assignchestno, getallcandidates, addcandidate, editcandidate, deletecandidate, getcandidate, addtrainer, edittrainer, deletetrainer, gettrainer, getalltrainer } from "../controllers/superadmin.controller.js";
import isauthenticated_superadmin from "../middlewares/is_authenticated_superadmin.js"

const superadminrouter = express.Router();

superadminrouter.post("/register", register);
superadminrouter.post("/login", login);
superadminrouter.post("/getall/candidate",isauthenticated_superadmin,getallcandidates);
superadminrouter.post("/getall/trainer",isauthenticated_superadmin, getalltrainer);
superadminrouter.post("/assign", isauthenticated_superadmin,assignchestno);
superadminrouter.post("/add/trainer",isauthenticated_superadmin, addtrainer);
superadminrouter.put("/edit/trainer", isauthenticated_superadmin,edittrainer);
superadminrouter.delete("/delete/trainer", isauthenticated_superadmin,deletetrainer);
superadminrouter.post("/get/trainer", isauthenticated_superadmin,gettrainer);
superadminrouter.post("/add/candidate", isauthenticated_superadmin,addcandidate);
superadminrouter.put("/edit/candidate", isauthenticated_superadmin,editcandidate);
superadminrouter.delete("/delete/candidate", isauthenticated_superadmin,deletecandidate);
superadminrouter.post("/get/candidate", isauthenticated_superadmin,getcandidate);
export default superadminrouter;