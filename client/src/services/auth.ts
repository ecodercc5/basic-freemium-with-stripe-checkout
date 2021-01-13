import firebase from "../firebase";

export interface IAuthService {
  signInWithGoogle: () => Promise<firebase.auth.UserCredential>;
  signOut: () => Promise<void>;
}

const signInWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  return firebase.auth().signInWithPopup(googleProvider);
};

const signOut = () => {
  return firebase.auth().signOut();
};

const AuthService: IAuthService = {
  signInWithGoogle,
  signOut,
};

export default AuthService;
