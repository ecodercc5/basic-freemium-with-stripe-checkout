import { useState, useEffect } from "react";
import firebase from "../firebase";

export interface IUserClaims {
  [x: string]: any;
  isPremium?: boolean;
}

export const useAuthState = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<firebase.auth.Error | null>(null);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [claims, setClaims] = useState<IUserClaims | null>(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      async (user) => {
        setUser(user);

        const idTokenResult = user ? await user.getIdTokenResult(true) : null;
        const claims: IUserClaims | null = user ? idTokenResult?.claims! : null;

        console.log(idTokenResult);

        console.log(idTokenResult?.token);

        setClaims(claims);
        setIsLoading(false);
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { isLoading, error, user, claims };
};
