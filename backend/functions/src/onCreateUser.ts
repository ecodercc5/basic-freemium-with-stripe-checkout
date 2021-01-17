import * as functions from "firebase-functions";
import { firestore } from "./firebase";
import stripe from "./stripe";

const onCreateUser = functions.auth.user().onCreate(async (user) => {
  console.log({ user });

  const { uid, email, displayName } = user;

  // create a new user doc
  const userRef = firestore.collection("users").doc(uid);

  // create a stripe customer: allows us to charge our users with stripe
  const stripeCustomer = await stripe.customers.create({
    metadata: { firebaseUid: uid },
  });

  const userDoc = { uid, email, displayName, stripeId: stripeCustomer.id };

  return userRef.set(userDoc);
});

export default onCreateUser;
