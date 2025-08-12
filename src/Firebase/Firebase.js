import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtewJrnAZ1ZBqA0dTxWhuOOqx3gXp3M9g",
  authDomain: "online-store-a895a.firebaseapp.com",
  projectId: "online-store-a895a",
  storageBucket: "online-store-a895a.firebasestorage.app",
  messagingSenderId: "1088111085428",
  appId: "1:1088111085428:web:04f41cc2af82bdd1814e21"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

