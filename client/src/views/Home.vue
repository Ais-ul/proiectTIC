<template>
  <div>
    <div class="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
   
      <div class="flex items-center gap-4">
        <button @click="showAddForm" class="bg-blue-500 text-white px-4 py-2 rounded">
          Adaugă produs
        </button>

        <div v-if="showForm" class="ml-4">
          <ProductForm
            :product="currentProduct"
            :formTitle="formTitle"
            :submitButtonText="submitButtonText"
            @submit-form="handleSubmit"
            @cancel-form="handleCancel"
            class="border p-4 rounded shadow-lg bg-white"
          />
        </div>
      </div>

      
      <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
        Delogare
      </button>
    </div>

  
    <ProductList :products="products" @edit-product="editProduct" @delete-product="deleteProduct" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { getAuth } from 'firebase/auth'; 
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
    ...mapGetters(['allProducts']),
    products() {
      return this.allProducts;
    },
  },
  async mounted() {
    await this.loadProducts();
  },
  methods: {
    ...mapActions(['loadProducts', 'addProduct', 'updateProduct', 'deleteProduct']),
    showAddForm() {
      this.currentProduct = { name: '', price: '' };
      this.formTitle = 'Te rog să adaugi un produs';
      this.submitButtonText = 'Adaugă';
      this.showForm = true;
    },
    editProduct(id) {
      const product = this.products.find((p) => p.id === id);
      if (product) {
        this.currentProduct = { ...product };
        this.formTitle = 'Editează produs';
        this.submitButtonText = 'Actualizează';
        this.showForm = true;
      } else {
        console.error('Produsul nu a fost găsit');
      }
    },
    async handleSubmit(product) {
      product.price = Number(product.price);
      if (isNaN(product.price) || product.price <= 0) {
        alert('Prețul trebuie să fie un număr pozitiv!');
        return;
      }

      if (product.id) {
        await this.updateProduct({ ...product });
      } else {
        await this.addProduct(product);
      }

      await this.loadProducts();
      this.showForm = false;
    },
    handleCancel() {
      this.showForm = false;
    },
    async deleteProductHandler(id) {
      await this.deleteProduct(id);
      await this.loadProducts();
    },
    async logout() {
      try {
        await getAuth().signOut();
        this.$router.push('/login'); 
      } catch (error) {
        console.error('Eroare la delogare:', error);
      }
    }
  }
};
</script>
