import { Router } from "express";
import Stripe from "stripe";
import stripe from "../stripe";
import admin, { firestore } from "../firebase";

const router = Router();

const WEBHOOK_SECRET = "whsec_ipqoCuyEQzirTGja3ZkFN2PO8f8T7tXA";

const handleCheckoutSessionCompleted = async (event: Stripe.Event) => {
  const session = event.data.object as Stripe.Checkout.Session;

  // get subscription id
  const subscriptionId = session.subscription;

  // retrieve the stripe customer
  const customerId = session.customer as string;
  const customer = (await stripe.customers.retrieve(
    customerId
  )) as Stripe.Response<Stripe.Customer>;

  // get its firebase uid
  const firebaseUid = customer.metadata.firebaseUid;

  // update user doc and claims to indicate premium user
  const userRef = firestore.collection("users").doc(firebaseUid);
  await userRef.update({ subscriptionId, active: true, isPremium: true });
  await admin.auth().setCustomUserClaims(firebaseUid, { isPremium: true });
};

router.post("/webhook", async (req, res) => {
  // get the stripe signature
  const signature: string = (req.headers["stripe-signature"] as string) || "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody!,
      signature,
      WEBHOOK_SECRET
    );
  } catch {
    return res.sendStatus(400);
  }

  switch (event.type) {
    case "checkout.session.completed":
      handleCheckoutSessionCompleted(event);
      break;
  }

  return res.sendStatus(200);
});

export default router;
