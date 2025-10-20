import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuxEFhL3SAVl3Y-xWDmS0VNjwYqHYtJI0",
  authDomain: "foodpanda-clone-7230a.firebaseapp.com",
  projectId: "foodpanda-clone-7230a",
  storageBucket: "foodpanda-clone-7230a.firebasestorage.app",
  messagingSenderId: "627212700366",
  appId: "1:627212700366:web:4c2d0e1080c5fc4b4d9e9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);