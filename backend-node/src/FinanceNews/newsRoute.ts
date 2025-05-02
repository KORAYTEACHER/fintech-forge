import { Router } from "express";
import passport from "passport";
import { getAllNews, getNewsSentiment } from "./newsController";


const newsRouter = Router();

newsRouter.get("/getallnews", getAllNews);
newsRouter.get("/getnewssentiment", getNewsSentiment);


export default newsRouter;