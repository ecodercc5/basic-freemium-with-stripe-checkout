import { Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";

const App = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Dashboard} />
      <PublicRoute path="/signin" component={SignIn} />
    </Switch>
  );
};

export default App;
