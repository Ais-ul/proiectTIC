<template>
  <div class="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
    <h2 class="text-xl font-semibold text-gray-700 mb-4">{{ formTitle }}</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
     
      <div class="relative">
        <input
          type="text"
          v-model="localProduct.name"
          @blur="validateName"
          class="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
          :class="{ 'border-red-500': showNameError }"
          placeholder="Nume produs"
        />
        <p v-if="showNameError" class="text-red-500 text-sm mt-1">Numele produsului este obligatoriu!</p>
      </div>

     
      <div class="relative">
        <input
          type="text"
          v-model="priceInput"
          @blur="validatePrice"
          class="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
          :class="{ 'border-red-500': showPriceError }"
          placeholder="Preț produs"
        />
        <p v-if="showPriceError" class="text-red-500 text-sm mt-1">Prețul trebuie să fie un număr valid!</p>
      </div>

     
      <div class="flex justify-end space-x-3">
        <button
          type="submit"
          class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          :disabled="!isFormValid"
        >
          {{ submitButtonText }}
        </button>
        <button
          type="button"
          @click="onCancel"
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Renunță
        </button>
      </div>
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
      localProduct: { ...this.product },
      showNameError: false,
      showPriceError: false,
    };
  },
  computed: {
    priceInput: {
      get() {
        return this.localProduct.price ? this.localProduct.price.toString() : '';
      },
      set(value) {
        this.localProduct.price = value.replace(',', '.'); 
      },
    },
    isFormValid() {
      return !this.showNameError && !this.showPriceError;
    },
  },
  watch: {
    product(newProduct) {
      this.localProduct = { ...newProduct };
      this.showNameError = false;
      this.showPriceError = false;
    },
  },
  methods: {
    validateName() {
      this.showNameError = !this.localProduct.name.trim();
    },
    validatePrice() {
      const parsedPrice = parseFloat(this.localProduct.price);
      this.showPriceError = isNaN(parsedPrice) || parsedPrice <= 0;
      if (!this.showPriceError) {
        this.localProduct.price = parsedPrice.toFixed(2); 
      }
    },
    handleSubmit() {
      this.validateName();
      this.validatePrice();

      if (this.isFormValid) {
        this.$emit('submit-form', this.localProduct);
      }
    },
    onCancel() {
      this.$emit('cancel-form');
    },
  },
};
</script>
