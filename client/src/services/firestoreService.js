import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import db from '../firebase'; // Importă instanța Firestore

// Obține toate produsele
export async function getProducts() {
  const productsCol = collection(db, 'products');
  const snapshot = await getDocs(productsCol);
  const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return products;
}

// Adaugă un produs nou
export async function addProduct(product) {
  const productsCol = collection(db, 'products');
  const docRef = await addDoc(productsCol, product);
  return { id: docRef.id, ...product };
}

// Actualizează un produs existent
export async function updateProduct(id, product) {
  const productRef = doc(db, 'products', id);
  await updateDoc(productRef, product);
  return { id, ...product };
}

// Șterge un produs
export async function deleteProduct(id) {
  const productRef = doc(db, 'products', id);
  await deleteDoc(productRef);
}