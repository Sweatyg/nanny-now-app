import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDILp5SYQFxsacyFsYyWeDdoGMfPjUKNz4",
  authDomain: "nannynow-33faf.firebaseapp.com",
  projectId: "nannynow-33faf",
  storageBucket: "nannynow-33faf.appspot.com",
  messagingSenderId: "618378545400",
  appId: "1:618378545400:web:c322aba88be30f442b530d",
  measurementId: "G-HPHZH8JYW9"
};

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
export default firebaseApp;
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
