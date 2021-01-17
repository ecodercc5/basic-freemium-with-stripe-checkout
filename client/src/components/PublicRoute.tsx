import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const PublicRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

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

export default PublicRoute;
