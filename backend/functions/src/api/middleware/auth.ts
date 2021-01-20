import { RequestHandler } from "express";
import admin from "../../firebase";

const isAuth: RequestHandler = async (req, res, next) => {
  // get auth header
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.sendStatus(401);

  // split up header -> type + token
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") return res.sendStatus(401);

  try {
    const userClaims = await admin.auth().verifyIdToken(token);

    req.userClaims = userClaims;

    return next();
  } catch {
    return res.sendStatus(401);
  }
};

export default isAuth;
