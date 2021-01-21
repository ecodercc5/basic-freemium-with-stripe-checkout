import { Router } from "express";
import stripe from "../stripe";
import { firestore } from "../firebase";
import isAuth from "./middleware/auth";
import { UserConverter } from "./models/user";

const router = Router();

const PRODUCT_ID = "price_1IBoQzJ9xLF03qVYwcRmWZSF";

router.post("/checkout", isAuth, async (req, res) => {
  // get the user uid
  const uid = req.userClaims?.uid as string;

  // get the user doc
  const userRef = firestore.collection("users").doc(uid);
  const userSnapshot = await userRef.withConverter(UserConverter).get();
  const user = userSnapshot.data();

  // create stripe checkout session
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: PRODUCT_ID,
        quantity: 1,
      },
    ],
    customer: user?.stripeId,
    success_url: "http://localhost:3000",
    cancel_url: "http://localhost:3000",
  });

  return res.json({ session });
});

export default router;
