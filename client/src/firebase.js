// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 

const firebaseConfig = {
  apiKey: "AIzaSyDPyMNX8JV28DHACsSOo-h__jftE3umeOc",
  authDomain: "mija-robert-proiect-tic.firebaseapp.com",
  projectId: "mija-robert-proiect-tic",
  storageBucket: "mija-robert-proiect-tic.firebasestorage.app",
  messagingSenderId: "831901173834",
  appId: "1:831901173834:web:5dc81fd9b0115cdfd5feb3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); 

export { db, auth };
export default db; 
