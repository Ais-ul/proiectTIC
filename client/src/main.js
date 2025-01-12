import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // adaugă această linie

createApp(App)
  .use(router)
  .use(store) // adaugă store-ul
  .mount('#app');
