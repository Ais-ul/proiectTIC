<template>
  <div>
    <h2>Lista de produse</h2>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.name }} - {{ product.price }}
        <button @click="editProduct(product.id)">Editează</button>
        <button @click="deleteProduct(product.id)">Șterge</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['products'],
  methods: {
    editProduct(id) {
      this.$emit('edit-product', id);
    },
    deleteProduct(id) {
      this.$emit('delete-product', id);
    }
  }
};
</script>