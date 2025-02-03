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
import { mapGetters, mapActions } from 'vuex';
import ProductList from '../components/ProductList.vue';
import ProductForm from '../components/ProductForm.vue';

export default {
  name: 'HomePage',
  components: { ProductList, ProductForm },
  data() {
    return {
      showForm: false,
      currentProduct: { name: '', price: '' },
      formTitle: 'Adaugă produs',
      submitButtonText: 'Adaugă',
    };
  },
  computed: {
    ...mapGetters(['allProducts']), // Obținem lista de produse din store
    products() {
      return this.allProducts;
    },
  },
  async mounted() {
    await this.loadProducts(); // Încărcăm produsele la montare
  },
  methods: {
    ...mapActions(['loadProducts', 'addProduct', 'updateProduct', 'deleteProduct']),
    showAddForm() {
      this.currentProduct = { name: '', price: '' };
      this.formTitle = 'Adaugă produs';
      this.submitButtonText = 'Adaugă';
      this.showForm = true;
    },
    editProduct(id) {
      const product = this.products.find((p) => p.id === id);
      this.currentProduct = { ...product };
      this.formTitle = 'Editează produs';
      this.submitButtonText = 'Actualizează';
      this.showForm = true;
    },
      async handleSubmit(product) {
    try {
      if (product.id) {
        await this.updateProduct(product); // Actualizare produs
      } else {
        await this.addProduct(product); // Adăugare produs
      }
      this.showForm = false;
    } catch (error) {
      alert('Eroare: ' + error.response.data.error); // Afișăm eroarea de la server
    }
  },
    async deleteProduct(id) {
      await this.deleteProduct(id);
    }
  },
};
</script>
