import express from "express";
import { bootstrap } from "./src/utlis/bootstrab.js";

const app = express();
app.use(express.json())
bootstrap(app)