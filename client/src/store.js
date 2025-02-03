import { createStore } from 'vuex';
import { getProducts, addProduct, updateProduct, deleteProduct } from './services/firestoreService';

const store = createStore({
  state() {
    return {
      products: [] // Lista de produse
    };
  },
  mutations: {
    setProducts(state, products) {
      state.products = products; // Setăm produsele în state
    },
    addProduct(state, product) {
      state.products.push(product); // Adăugăm un nou produs în listă
    },
    updateProduct(state, updatedProduct) {
      const index = state.products.findIndex(p => p.id === updatedProduct.id);
      if (index !== -1) {
        state.products[index] = updatedProduct; // Actualizăm produsul
      }
    },
    deleteProduct(state, productId) {
      state.products = state.products.filter(p => p.id !== productId); // Ștergem produsul
    }
  },
  actions: {
    async loadProducts({ commit }) {
      try {
        const products = await getProducts();
        commit('setProducts', products);
      } catch (error) {
        console.error('Eroare la încărcarea produselor:', error);
      }
    },
    async addProduct({ commit }, product) {
      try {
        const newProduct = await addProduct(product);
        commit('addProduct', { ...product, id: newProduct.id }); // Adăugăm produsul cu ID generat
      } catch (error) {
        console.error('Eroare la adăugarea produsului:', error);
      }
    },
    async updateProduct({ commit }, product) {
      try {
        await updateProduct(product.id, product);
        commit('updateProduct', product);
      } catch (error) {
        console.error('Eroare la actualizarea produsului:', error);
      }
    },
    async deleteProduct({ commit }, productId) {
      try {
        await deleteProduct(productId);
        commit('deleteProduct', productId);
      } catch (error) {
        console.error('Eroare la ștergerea produsului:', error);
      }
    }
  },
  getters: {
    allProducts(state) {
      return state.products;
    }
  }
});

export default store;
