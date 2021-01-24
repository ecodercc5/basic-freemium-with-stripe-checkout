import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import premiumApi from "./premium";
import stripeApi from "./stripe";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.raw({
    verify: (req: express.Request, res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use("/premium", premiumApi);
app.use("/stripe", stripeApi);

const api = functions.https.onRequest(app);

export default api;
