import { useHistory } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const SignIn = () => {
  const { auth } = useAuth();
  const history = useHistory();

  const handleClick = () => {
    return auth.signInWithGoogle().then(() => history.push("/"));
  };

  return (
    <div>
      <button onClick={handleClick}>Sign In With Google</button>
    </div>
  );
};

export default SignIn;
