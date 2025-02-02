import { createRouter, createWebHistory } from 'vue-router';
import { getAuth } from 'firebase/auth';

// Importă componentele tale pentru rute
import Home from './views/Home.vue';
import About from './views/About.vue';
import LoginPage  from './components/LoginPage.vue'; // Importă pagina de login
import RegisterPage  from './components/RegisterPage.vue'; // Importă pagina de register

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }, // Protejează ruta de home
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage // Asigură-te că aceasta este corectă
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  }

];

// Creează router-ul
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Adaugă un middleware pentru a verifica autentificarea
router.beforeEach((to, from, next) => {
  const user = getAuth().currentUser; // Obține utilizatorul curent din Firebase Auth

  // Dacă ruta necesită autentificare și utilizatorul nu este autentificat
  if (to.meta.requiresAuth && !user) {
    next({ name: 'Login' }); // Redirecționează la login
  } else if (user && (to.name === 'LoginPage' || to.name === 'RegisterPage')) {
    next({ name: 'Home' }); // Dacă utilizatorul este autentificat și încearcă să acceseze login/register, redirecționează-l la home
  } else {
    next(); // Permite accesul la rutele dorite
  }
});

export default router;
