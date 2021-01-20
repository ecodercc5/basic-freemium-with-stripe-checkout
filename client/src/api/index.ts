import axios from "axios";
import firebase from "../firebase";

const api = axios.create({
  baseURL: "http://localhost:5001/playground-d0fbe/us-central1/api/",
});

api.interceptors.request.use(async (config) => {
  const token = (await firebase.auth().currentUser?.getIdToken()) || "";
  const authHeader = `Bearer ${token}`;

  config.headers["authorization"] = authHeader;

  return config;
});
