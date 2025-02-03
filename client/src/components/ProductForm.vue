<template>
  <div>
    <h2>{{ formTitle }}</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">Nume produs:</label>
        <input type="text" v-model="localProduct.name" id="name" />
        <span v-if="!isValidName" class="error">Numele produsului este obligatoriu!</span>
      </div>
      <div>
        <label for="price">Preț produs:</label>
        <input type="text" v-model="localProduct.price" id="price" />
        <span v-if="!isValidPrice" class="error">Prețul trebuie să fie un număr valid!</span>
      </div>
      <button type="submit" :disabled="!isFormValid">{{ submitButtonText }}</button>
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
      isValidName: true,
      isValidPrice: true,
    };
  },
  watch: {
    // Actualizează copia locală când prop-ul se schimbă
    product(newProduct) {
      this.localProduct = { ...newProduct };
    },
  },
  computed: {
    isFormValid() {
      return this.isValidName && this.isValidPrice;
    }
  },
  methods: {
    validateForm() {
      // Validăm dacă numele nu este gol și dacă prețul este valid
      this.isValidName = this.localProduct.name.trim() !== ''; 
      this.isValidPrice = !isNaN(this.localProduct.price) && this.localProduct.price.trim() !== '';
    },
    handleSubmit() {
      this.validateForm(); // Validăm înainte de trimitere
      if (this.isFormValid) {
        this.$emit('submit-form', this.localProduct); // Emiterea datelor valide către părinte
      }
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
  font-size: 12px;
}
</style>
