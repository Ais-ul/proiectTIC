import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import './assets/tailwind.css'; // Importați Tailwind CSS
import store from './store'; // adaugă această linie
import './assets/tailwind.css';

createApp(App)
  .use(router)
  .use(store) // adaugă store-ul
  .mount('#app');

