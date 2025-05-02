import { Router } from "express";
import { convertCurrency, getAllCurrency } from "./currencyController";


const currencyRouter = Router();

currencyRouter.get("/getallcurrency", getAllCurrency);
currencyRouter.get("/convertcurrency", convertCurrency);




export default currencyRouter;