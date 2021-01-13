import { useState, useEffect } from "react";
import firebase from "../firebase";

export const useAuthState = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<firebase.auth.Error | null>(null);
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      (user) => {
        setUser(user);
        setIsLoading(false);
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { isLoading, error, user };
};
