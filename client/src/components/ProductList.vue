<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Lista de produse</h2>
    <ul class="space-y-4">
      <li 
        v-for="product in products" 
        :key="product.id" 
        class="flex justify-between items-center p-4 border border-gray-300 rounded-lg bg-gray-50"
      >
      
        <router-link 
          :to="'/product/' + product.id" 
          class="text-lg font-bold text-blue-600 hover:underline"
        >
          {{ product.name }} - {{ product.price }} RON
        </router-link>
        
        <div class="space-x-2">
          <button @click="editProduct(product)" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Editează</button>
          <button @click="deleteProduct(product.id)" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Șterge</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['products'],
  methods: {
    editProduct(product) {
      this.$emit('edit-product', product.id);
    },
    deleteProduct(productId) {
      this.$emit('delete-product', productId);
    }
  }
};
</script>
