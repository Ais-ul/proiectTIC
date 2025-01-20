import db from '../firebase'; // Importă instanța Firestore

// Funcție pentru a obține toate produsele
export const getProducts = async () => {
  const productsCollection = await db.collection('products').get(); // Obține colecția 'products'
  return productsCollection.docs.map(doc => doc.data()); // Returnează datele produselor
};

// Funcție pentru a adăuga un produs
export const addProduct = async (product) => {
  await db.collection('products').add(product); // Adaugă un nou document în colecția 'products'
};

// Funcție pentru a șterge un produs
export const deleteProduct = async (id) => {
  await db.collection('products').doc(id).delete(); // Șterge documentul cu ID-ul specificat
};

// Funcție pentru a actualiza un produs
export const updateProduct = async (id, updatedProduct) => {
  await db.collection('products').doc(id).update(updatedProduct); // Actualizează documentul cu ID-ul specificat
};
