import { createRouter, createWebHistory } from 'vue-router';
import { getAuth } from 'firebase/auth';


import Home from './views/Home.vue';
import LoginPage  from './components/LoginPage.vue'; 
import RegisterPage  from './components/RegisterPage.vue'; 
import ProductDetails from './views/ProductDetails.vue';

const routes = [
  {
    path: '/',
    redirect: '/login', 
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }, 
  },

  {
    path: '/product/:id',
    name: 'ProductDetails',
    component:  ProductDetails,
    props: true, 
    meta: { requiresAuth: true } 
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage 
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  }

];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


router.beforeEach((to, from, next) => {
  const user = getAuth().currentUser; 

 
  if (to.meta.requiresAuth && !user) {
    next({ name: 'Login' }); 
  } else if (user && (to.name === 'LoginPage' || to.name === 'RegisterPage')) {
    next({ name: 'Home' }); 
  } else {
    next(); 
  }
});

export default router;
