<template>
  <div>
    <h2 class="text-green-500 text-xl font-semibold mb-4">Lista de produse</h2>
    <ul class="space-y-4">
      <li v-for="product in products" :key="product.id" class="flex justify-between items-center p-4 border border-gray-300 rounded-lg bg-gray-50">
        <span class="text-lg font-bold">{{ product.name }} - {{ product.price }} RON</span>
        
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
      this.$emit('edit-product', product.id); // Emiterea unui eveniment cu ID-ul produsului
    },
    deleteProduct(productId) {
      this.$emit('delete-product', productId); // Emiterea unui eveniment cu ID-ul produsului
    }
  }
};
</script>
