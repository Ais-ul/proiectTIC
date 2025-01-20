<template>
  <div>
    <h1>Welcome to the HomePage</h1>
    <ul>
      <li v-for="product in products" :key="product.id">{{ product.name }} - {{ product.price }} </li>
    </ul>
    <button @click="addProduct">Adaugă produs</button>
  </div>
</template>

<script>
import { getProducts, addProduct } from '../services/firestoreService';

export default {
  name: 'HomePage',
  data() {
    return {
      products: []
    };
  },
  async mounted() {
    // Obține produsele din Firestore la încărcarea paginii
    this.products = await getProducts();
  },
  methods: {
    async addProduct() {
      // Exemplu de produs de adăugat
      const newProduct = {
        name: 'Produs Nou',
        price: '100 RON',
        description: 'Descrierea produsului',
        category: {
          name: 'Categorie Exemplu'
        },
        stock: {
          quantity: 10
        }
      };
      await addProduct(newProduct);
      this.products = await getProducts(); // Actualizează lista de produse după adăugare
    }
  }
};
</script>

<style scoped>
/* Stiluri pentru HomePage */
</style>

