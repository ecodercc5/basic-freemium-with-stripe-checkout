import { useState, useEffect } from "react";
import firebase from "../firebase";

export const useAuthState = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<firebase.auth.Error | null>(null);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [claims, setClaims] = useState<firebase.auth.IdTokenResult | null>(
    null
  );

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      async (user) => {
        setUser(user);

        let idTokenClaims = user ? await user.getIdTokenResult() : null;

        console.log(idTokenClaims?.token);

        setClaims(idTokenClaims);
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
