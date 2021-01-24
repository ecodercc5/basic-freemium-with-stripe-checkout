import { useAuth } from "../provider/AuthProvider";
import { useStripe } from "../provider/StripeProvider";
import * as premiumApi from "../api/premium";
import { NonPremium, Premium } from "../components/Premium";

const Dashboard = () => {
  const { auth, claims, refreshClaims } = useAuth();
  const stripe = useStripe();

  const handleGetPremium = async () => {
    // create a session
    const session = await premiumApi.getCheckoutSession();

    if (!stripe) return;

    return stripe.redirectToCheckout({ sessionId: session.id });
  };

  const handleSignout = () => {
    return auth.signOut();
  };

  const handleCancelSubscription = () => {
    console.log("Canceling subscription");

    premiumApi
      .cancelSubscription()
      .then(refreshClaims)
      .catch(() => console.log("Error canceling subscription"));
  };

  console.log({ claims });

  return (
    <div>
      <h1>Dashboard</h1>
      <Premium>
        <h2>You are a premium user</h2>
        <button onClick={handleCancelSubscription}>Cancel Subscription</button>
      </Premium>
      <NonPremium>
        <h2>You are not a premium user</h2>
        <button onClick={handleGetPremium}>Get Premium</button>
      </NonPremium>

      <button onClick={handleSignout}>Sign Out</button>
    </div>
  );
};

export default Dashboard;
