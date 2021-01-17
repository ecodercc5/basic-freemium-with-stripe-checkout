import { useAuth } from "../provider/AuthProvider";

const SignIn = () => {
  const { auth } = useAuth();

  const handleClick = () => {
    return auth.signInWithGoogle();
  };

  return (
    <div>
      <button onClick={handleClick}>Sign In With Google</button>
    </div>
  );
};

export default SignIn;
