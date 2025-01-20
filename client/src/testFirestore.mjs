import firebase from "./firebase.js"; // Importă obiectul default din firebase
const { db } = firebase; // Extrage db din obiectul importat

import { collection, addDoc } from "firebase/firestore";

const testFirestore = async () => {
  try {
    const docRef = await addDoc(collection(db, "testCollection"), {
      name: "Test",
      createdAt: new Date()
    });
    console.log("Document scris cu ID-ul:", docRef.id);
  } catch (e) {
    console.error("Eroare la scrierea documentului:", e);
  }
};

testFirestore();
