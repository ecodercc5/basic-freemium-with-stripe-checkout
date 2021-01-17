import Stripe from "stripe";
import config from "./config";

const API_KEY: string = config.stripe.api_key;

const stripe = new Stripe(API_KEY, { apiVersion: "2020-08-27" });

export default stripe;
