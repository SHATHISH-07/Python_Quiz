import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZsFilSnJpd4GzKHAANsvOgFvNhWgId90",
  authDomain: "pythonquiz-2e37c.firebaseapp.com",
  projectId: "pythonquiz-2e37c",
  storageBucket: "pythonquiz-2e37c.firebasestorage.app",
  messagingSenderId: "81751714521",
  appId: "1:81751714521:web:98b56a89ff51bf182f6cc8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
