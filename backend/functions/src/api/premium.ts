import { Router } from "express";
import stripe from "../stripe";
import admin, { firestore } from "../firebase";
import isAuth from "./middleware/auth";
import { UserConverter } from "./models/user";

const router = Router();

const PRODUCT_ID = "price_1IBoQzJ9xLF03qVYwcRmWZSF";

router.use(isAuth);

router.post("/checkout", async (req, res) => {
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

router.post("/cancel", async (req, res) => {
  console.log(req.userClaims);

  const uid: string = req.userClaims?.uid!;

  // get the user
  const userRef = firestore.collection("users").doc(uid);
  const userSnapshot = await userRef.withConverter(UserConverter).get();
  const user = userSnapshot.data()!;

  // get subscriptionId from the user
  const { subscriptionId } = user;

  // error if subscriptionId does not exist
  if (!subscriptionId) return res.sendStatus(403);

  // cancel the subscription
  await stripe.subscriptions.del(subscriptionId);

  // set isPremium prop on user claims to false
  await admin.auth().setCustomUserClaims(uid, { isPremium: false });

  // update user doc
  await userRef.update({
    subscriptionId: admin.firestore.FieldValue.delete(),
    active: false,
    isPremium: false,
  });

  return res.json({ message: "Successfully canceled subscription" });
});

export default router;
