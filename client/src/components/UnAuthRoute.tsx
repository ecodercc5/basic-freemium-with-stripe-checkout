import { Redirect, Route, RouteProps } from "react-router-dom";
import firebase from "../firebase";

const UnAuthRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const user = firebase.auth().currentUser;

  if (!Component) return null;

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return !user ? <Component {...routeProps} /> : <Redirect to="/" />;
      }}
    />
  );
};

export default UnAuthRoute;