import { Router } from "express";
import CheckStatusServerController from "../controllers/CheckStatusServerController";

const checkStatus = Router();

checkStatus.get('/status', new CheckStatusServerController().create);

export default checkStatus;