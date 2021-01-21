import { useAuth } from "../provider/AuthProvider";
import { useStripe } from "../provider/StripeProvider";
import * as productApi from "../api/product";

const Dashboard = () => {
  const { auth, claims } = useAuth();
  const stripe = useStripe();

  const handleGetPremium = async () => {
    // create a session
    const session = await productApi.getProductCheckoutSession();

    if (!stripe) return;

    return stripe.redirectToCheckout({ sessionId: session.id });
  };

  const handleSignout = () => {
    return auth.signOut();
  };

  console.log({ claims });

  console.log({ isPremium: claims?.isPremium });

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>
        {claims?.isPremium
          ? "You are a premium user"
          : "You are not a premium user"}
      </h2>
      <button onClick={handleGetPremium}>Get Premium</button>
      <button onClick={handleSignout}>Sign Out</button>
    </div>
  );
};

export default Dashboard;
