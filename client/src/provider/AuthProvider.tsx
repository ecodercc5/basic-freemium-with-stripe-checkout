import { createContext, useContext } from "react";
import firebase from "../firebase";
import { IUserClaims, useAuthState } from "../hooks/auth";
import AuthService, { IAuthService } from "../services/auth";

interface IAuthContext {
  user: firebase.User | null;
  auth: IAuthService;
  claims: IUserClaims | null;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  auth: AuthService,
  claims: null,
});

const AuthProvider: React.FC = ({ children }) => {
  const { isLoading, user, claims } = useAuthState();

  console.log({ isLoading, user });

  return (
    <AuthContext.Provider value={{ user, auth: AuthService, claims }}>
      {isLoading ? <div>loading</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
