import { faker } from '@faker-js/faker';

import { getFirestore, collection, addDoc } from 'firebase/firestore';
import db from '../src/firebase.js'; // Asigură-te că calea este corectă și eventual adaugi extensia .js, în funcție de cum exporți

async function generateProducts(count = 50) {
  const products = [];
  for (let i = 0; i < count; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
      category: {
        id: faker.string.uuid(),
        name: faker.commerce.department(),
        features: Array(3).fill().map(() => faker.commerce.productAdjective())
      },
      stock: {
        quantity: faker.number.int({ min: 0, max: 100 }),
        warehouse: faker.location.city()
      }
    });
  }
  return products;
}

async function seedDatabase() {
  const products = await generateProducts();
  const productsCol = collection(db, 'products');
  for (const product of products) {
    await addDoc(productsCol, product);
  }
  console.log('Baza de date a fost populată cu date de test.');
}

seedDatabase();