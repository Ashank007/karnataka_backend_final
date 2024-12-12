import express from "express";
import { bpet100mFmlrun, bpet9Feetditch, bpetHrope, bpetkmrun, bpetVrope } from "../controllers/trainer._bpetcontroller.js";
import { calculatefinalresult_bpet, getcsv_bpet } from "../controllers/trainer.controller.js";
import isauthenticated_trainer from "../middlewares/isauthenticated_trainer.js";
const bpettrainerrouter = express.Router();

bpettrainerrouter.post("/bpet/kmrun", isauthenticated_trainer,bpetkmrun);
bpettrainerrouter.post("/bpet/vrope", isauthenticated_trainer,bpetVrope);
bpettrainerrouter.post("/bpet/hrope", isauthenticated_trainer,bpetHrope);
bpettrainerrouter.post("/bpet/100mrun", isauthenticated_trainer,bpet100mFmlrun);
bpettrainerrouter.post("/bpet/9feetditch", isauthenticated_trainer,bpet9Feetditch);
bpettrainerrouter.post("/calculatefinalresult/bpet", isauthenticated_trainer,calculatefinalresult_bpet);
bpettrainerrouter.post("/getcsv/bpet", isauthenticated_trainer,getcsv_bpet);
export default bpettrainerrouter;