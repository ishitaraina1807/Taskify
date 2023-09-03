import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD6o6NHd7sXBaaQuoiHUX2Wjq9FqWM_-3o",
  authDomain: "taskify-b7ee5.firebaseapp.com",
  projectId: "taskify-b7ee5",
  storageBucket: "taskify-b7ee5.appspot.com",
  messagingSenderId: "544703862561",
  appId: "1:544703862561:web:37eaca50794d6a029a1060",
  measurementId: "G-NEW5DWT2WT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, auth, analytics,db }; 
