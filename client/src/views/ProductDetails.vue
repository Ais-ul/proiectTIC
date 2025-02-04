<template>
  <div class="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold mb-4">{{ product.name }}</h1>
    <p class="text-lg"><strong>Preț:</strong> {{ product.price }} RON</p>
    <p class="text-lg"><strong>Descriere:</strong> {{ product.description || 'Nu există descriere.' }}</p>
    <p class="text-lg"><strong>Stoc:</strong> {{ product.stock !== undefined ? product.stock : 'Necunoscut' }}</p>
    <p class="text-lg"><strong>Categorie:</strong> {{ product.category || 'Fără categorie' }}</p>

  <router-link to="/home" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded inline-block text-center">
  Înapoi
</router-link>
  </div>
</template>

<script>
import { getProductById } from '../services/firestoreService';

export default {
  data() {
    return {
      product: {}
    };
  },
  async created() {
    const productId = this.$route.params.id; 
    this.product = await getProductById(productId);
  }
};
</script>
