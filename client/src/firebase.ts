import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArgdpI_-vebWRmc7Y9U6vHSh1r2fMWL_0",
  authDomain: "playground-d0fbe.firebaseapp.com",
  databaseURL: "https://playground-d0fbe.firebaseio.com",
  projectId: "playground-d0fbe",
  storageBucket: "playground-d0fbe.appspot.com",
  messagingSenderId: "785721616081",
  appId: "1:785721616081:web:f6ecc93f487a28f11487f0",
};

firebase.initializeApp(firebaseConfig);

firebase.auth().useEmulator("http://localhost:9099");

export default firebase;
