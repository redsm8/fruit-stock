
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjwWAjwPjozL9fzC4JOj8szEgOmafwGTU",
  authDomain: "web-dev-final-5e566.firebaseapp.com",
  projectId: "web-dev-final-5e566",
  storageBucket: "web-dev-final-5e566.appspot.com",
  messagingSenderId: "684971492709",
  appId: "1:684971492709:web:65448e236d4263e8fb4d8c",
  measurementId: "G-WCMXDN1YFV"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const google = new GoogleAuthProvider();
