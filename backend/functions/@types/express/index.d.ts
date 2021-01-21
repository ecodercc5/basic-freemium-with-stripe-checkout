import admin from "firebase-admin";
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      userClaims?: admin.auth.DecodedIdToken;
      rawBody?: Buffer;
    }
  }
}
