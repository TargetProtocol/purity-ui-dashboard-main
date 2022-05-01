import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAjuPEZu7ihCEBFn32iUVZF-fzK_sDmZos",
  authDomain: "plutoexchange-b12ff.firebaseapp.com",
  projectId: "plutoexchange-b12ff",
  storageBucket: "plutoexchange-b12ff.appspot.com",
  messagingSenderId: "200656826701",
  appId: "1:200656826701:web:e37fc940c811e76f99c704",
  measurementId: "G-R988HLBWEZ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
