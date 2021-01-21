import { Stripe } from "@stripe/stripe-js";
import { createContext, useContext, useEffect, useState } from "react";
import stripePromise from "../stripe";

type StripeContextType = Stripe | null;

const StripeContext = createContext<StripeContextType>(null);

const StripeProvider: React.FC = ({ children }) => {
  const [stripe, setStripe] = useState<StripeContextType>(null);

  useEffect(() => {
    const loadStripe = async () => {
      const loadedStripe = await stripePromise;

      setStripe(loadedStripe);
    };

    loadStripe();
  }, []);

  return (
    <StripeContext.Provider value={stripe}>{children}</StripeContext.Provider>
  );
};

export const useStripe = () => useContext(StripeContext);

export default StripeProvider;
