import express from "express"
import { create_batchno, get_batchno, delete_batchno, edit_batchno } from "../controllers/batch_no.controller.js";
import isauthenticated_superadmin from "../middlewares/is_authenticated_superadmin.js"
const batch_no_router = express.Router();

batch_no_router.get("/get-batchno", isauthenticated_superadmin,get_batchno);
batch_no_router.post("/create-batchno", isauthenticated_superadmin,create_batchno);
batch_no_router.put("/edit-batchno", isauthenticated_superadmin,edit_batchno);
batch_no_router.delete("/delete-batchno", isauthenticated_superadmin,delete_batchno);
export default batch_no_router;