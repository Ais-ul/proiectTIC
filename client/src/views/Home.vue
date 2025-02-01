<template>
  <div>
    <h1>Welcome to the HomePage</h1>
    <ProductList :products="products" @edit-product="editProduct" @delete-product="deleteProduct" />
    <button @click="showAddForm">Adaugă produs</button>
    <ProductForm
      v-if="showForm"
      :product="currentProduct"
      :formTitle="formTitle"
      :submitButtonText="submitButtonText"
      @submit-form="handleSubmit"
    />
  </div>
</template>

<script>
import ProductList from '../components/ProductList.vue';
import ProductForm from '../components/ProductForm.vue';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/firestoreService';

export default {
  name: 'HomePage', // Schimbă numele componentei
  components: { ProductList, ProductForm },
  data() {
    return {
      products: [],
      showForm: false,
      currentProduct: { name: '', price: '' },
      formTitle: 'Adaugă produs',
      submitButtonText: 'Adaugă'
    };
  },
  async mounted() {
    this.products = await getProducts();
  },
  methods: {
    showAddForm() {
      this.currentProduct = { name: '', price: '' };
      this.formTitle = 'Adaugă produs';
      this.submitButtonText = 'Adaugă';
      this.showForm = true;
    },
    editProduct(id) {
      const product = this.products.find(p => p.id === id);
      this.currentProduct = { ...product };
      this.formTitle = 'Editează produs';
      this.submitButtonText = 'Actualizează';
      this.showForm = true;
    },
    async handleSubmit(product) {
      if (product.id) {
        await updateProduct(product.id, product);
      } else {
        await addProduct(product);
      }
      this.products = await getProducts();
      this.showForm = false;
    },
    async deleteProduct(id) {
      await deleteProduct(id);
      this.products = await getProducts();
    }
  }
};
</script>

