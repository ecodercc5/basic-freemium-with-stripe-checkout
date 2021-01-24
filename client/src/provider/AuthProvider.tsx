import { createContext, useContext } from "react";
import firebase from "../firebase";
import { IUserClaims, useAuthState } from "../hooks/auth";
import AuthService, { IAuthService } from "../services/auth";

interface IAuthContext {
  user: firebase.User | null;
  auth: IAuthService;
  claims: IUserClaims | null;
  refreshClaims: () => Promise<any>;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  auth: AuthService,
  claims: null,
  refreshClaims: async () => {},
});

const AuthProvider: React.FC = ({ children }) => {
  const { isLoading, user, claims, refreshClaims } = useAuthState();

  console.log({ isLoading, user });

  return (
    <AuthContext.Provider
      value={{ user, auth: AuthService, claims, refreshClaims }}
    >
      {isLoading ? <div>loading</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
