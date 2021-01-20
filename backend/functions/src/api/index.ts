import * as functions from "firebase-functions";
import express from "express";
import productApi from "./product";

const app = express();

app.use("/product", productApi);

const api = functions.https.onRequest(app);

export default api;
