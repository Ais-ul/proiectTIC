import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import db from '../firebase';

// Validare pentru produs
function validateProduct(product) {
 if (!product.name || typeof product.name !== 'string' || product.name.trim() === '' || /\d/.test(product.name)) {
    throw new Error('Numele produsului este invalid. Nu trebuie să conțină cifre.');
  }
  if (typeof product.price !== 'number' || product.price <= 0) {
    throw new Error('Prețul produsului este invalid.');
  }
}

// Obține toate produsele
export async function getProducts() {
  try {
    const productsCol = collection(db, 'products');
    const snapshot = await getDocs(productsCol);
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return products;
  } catch (error) {
    console.error('Eroare la obținerea produselor:', error);
    throw error;
  }
}

// Adaugă un produs nou
export async function addProduct(product) {
  validateProduct(product); // Validează produsul înainte de salvare
  try {
    const productsCol = collection(db, 'products');
    const docRef = await addDoc(productsCol, product);
    return { id: docRef.id, ...product };
  } catch (error) {
    console.error('Eroare la adăugarea produsului:', error);
    throw error;
  }
}

// Actualizează un produs existent
export async function updateProduct(id, product) {
  validateProduct(product); // Validează produsul înainte de actualizare
  try {
    const productRef = doc(db, 'products', id);
    await updateDoc(productRef, product);
    return { id, ...product };
  } catch (error) {
    console.error('Eroare la actualizarea produsului:', error);
    throw error;
  }
}

// Șterge un produs
export async function deleteProduct(id) {
  try {
    const productRef = doc(db, 'products', id);
    await deleteDoc(productRef);
  } catch (error) {
    console.error('Eroare la ștergerea produsului:', error);
    throw error;
  }
}