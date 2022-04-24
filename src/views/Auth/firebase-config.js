import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyBfSUGgPS_MZdiutsC_lGbYbxfYr3KtSHw",
    authDomain: "auth-5af05.firebaseapp.com",
    projectId: "auth-5af05",
    storageBucket: "auth-5af05.appspot.com",
    messagingSenderId: "341350787756",
    appId: "1:341350787756:web:9afe59db9fa3e701488d09",
    measurementId: "G-D081HPR789"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);