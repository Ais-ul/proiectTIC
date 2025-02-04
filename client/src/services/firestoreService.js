import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import db from '../firebase';


function validateProduct(product) {
 if (!product.name || typeof product.name !== 'string' || product.name.trim() === '' || /\d/.test(product.name)) {
    throw new Error('Numele produsului este invalid. Nu trebuie să conțină cifre.');
  }
  if (typeof product.price !== 'number' || product.price <= 0) {
    throw new Error('Prețul produsului este invalid.');
  }
}


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


export async function addProduct(product) {
  validateProduct(product); 
  try {
    const productsCol = collection(db, 'products');
    const docRef = await addDoc(productsCol, product);
    return { id: docRef.id, ...product }; 
  } catch (error) {
    console.error('Eroare la adăugarea produsului:', error);
    throw error;
  }
}


export async function updateProduct(id, product) {
  validateProduct(product);
  try {
    const productRef = doc(db, 'products', id);
    await updateDoc(productRef, product);
    return { id, ...product };
  } catch (error) {
    console.error('Eroare la actualizarea produsului:', error);
    throw error;
  }
}
export async function getProductById(id) {
  try {
    const productRef = doc(db, 'products', id);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      const productData = productSnap.data();
      return {
        id: productSnap.id,
        name: productData.name,
        price: productData.price,
        description: productData.description || 'Nu există descriere.',
        stock: productData.stock !== undefined ? productData.stock : 'Necunoscut',
        category: productData.category || 'Fără categorie'
      };
    } else {
      throw new Error('Produsul nu a fost găsit.');
    }
  } catch (error) {
    console.error('Eroare la obținerea produsului:', error);
    throw error;
  }
}

export async function deleteProduct(id) {
  try {
    const productRef = doc(db, 'products', id);
    await deleteDoc(productRef);
  } catch (error) {
    console.error('Eroare la ștergerea produsului:', error);
    throw error;
  }
}