import { Router } from "express";
import { getChatbotResponse } from "./financeController";


const financeRouter = Router();

financeRouter.post("/chat", getChatbotResponse);


export default financeRouter