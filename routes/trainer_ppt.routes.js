import express from "express";
import { Ppt100msprint, Ppt5mShuttle, Pptchinups, Pptkmrun, Pptpushups, Pptsitups } from "../controllers/trainer_ppt.controller.js";
import { register, login, getcsv_ppt, calculatefinalresult_ppt} from "../controllers/trainer.controller.js";
import isauthenticated_trainer from "../middlewares/isauthenticated_trainer.js";
const ppttrainerrouter = express.Router();

ppttrainerrouter.post("/register", register);
ppttrainerrouter.post("/login", login);
ppttrainerrouter.post("/ppt/kmrun", isauthenticated_trainer,Pptkmrun);
ppttrainerrouter.post("/ppt/chinups", isauthenticated_trainer,Pptchinups);
ppttrainerrouter.post("/ppt/5mshuttle", isauthenticated_trainer,Ppt5mShuttle);
ppttrainerrouter.post("/ppt/pushups", isauthenticated_trainer,Pptpushups);
ppttrainerrouter.post("/ppt/situps", isauthenticated_trainer,Pptsitups);
ppttrainerrouter.post("/ppt/100msprint", isauthenticated_trainer,Ppt100msprint);
ppttrainerrouter.post("/getcsv/ppt", isauthenticated_trainer,getcsv_ppt);
ppttrainerrouter.post("/calculatefinalresult/ppt", isauthenticated_trainer,calculatefinalresult_ppt);
export default ppttrainerrouter;