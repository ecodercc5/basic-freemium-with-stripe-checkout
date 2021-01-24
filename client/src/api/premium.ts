import api from "./index";

interface CheckoutSession {
  id: string;
}

export const getCheckoutSession = async (): Promise<CheckoutSession> => {
  const res = await api.post("/premium/checkout");
  const { session } = res.data;

  return session as CheckoutSession;
};

export const cancelSubscription = () => {
  return api.post("/premium/cancel");
};
