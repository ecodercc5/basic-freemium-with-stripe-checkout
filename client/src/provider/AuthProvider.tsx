import { createContext, useContext } from "react";
import firebase from "../firebase";
import { useAuthState } from "../hooks/auth";
import AuthService, { IAuthService } from "../services/auth";

interface IAuthContext {
  user: firebase.User | null;
  auth: IAuthService;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  auth: AuthService,
});

const AuthProvider: React.FC = ({ children }) => {
  const { isLoading, user } = useAuthState();

  console.log({ isLoading, user });

  return (
    <AuthContext.Provider value={{ user, auth: AuthService }}>
      {isLoading ? <div>loading</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
