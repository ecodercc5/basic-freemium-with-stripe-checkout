import api from "./index";

interface CheckoutSession {
  id: string;
}

export const getProductCheckoutSession = async (): Promise<CheckoutSession> => {
  const res = await api.post("/product/checkout");
  const { session } = res.data;

  return session as CheckoutSession;
};
