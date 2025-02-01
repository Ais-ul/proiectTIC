<template>
  <div>
    <h2>{{ formTitle }}</h2>
    <form @submit.prevent="submitForm">
      <label>Nume:</label>
      <input v-model="localProduct.name" required />
      <label>Preț:</label>
      <input v-model="localProduct.price" type="number" required />
      <button type="submit">{{ submitButtonText }}</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    formTitle: {
      type: String,
      required: true,
    },
    submitButtonText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localProduct: { ...this.product }, // Copie locală a prop-ului
    };
  },
  watch: {
    // Actualizează copia locală când prop-ul se schimbă
    product(newProduct) {
      this.localProduct = { ...newProduct };
    },
  },
  methods: {
    submitForm() {
      // Emite eveniment cu datele actualizate
      this.$emit('submit-form', this.localProduct);
    },
  },
};
</script>

<style scoped>
/* Stiluri pentru formular */
</style>