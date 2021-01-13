import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import UnAuthRoute from "./components/UnAuthRoute";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";

const App = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Dashboard} />
      <UnAuthRoute path="/signin" component={SignIn} />
    </Switch>
  );
};

export default App;
