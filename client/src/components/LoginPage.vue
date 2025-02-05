<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const auth = getAuth();
const router = useRouter();

const login = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const token = await userCredential.user.getIdToken();
    localStorage.setItem("token", token);
   router.push("/home"); 
  } catch (error) {
    errorMessage.value = "Eroare la autentificare!";
  }
};

// const goToRegister = () => {
//   router.push("/register");
// };
</script>

<template>
  <div class="flex items-center justify-center mt-12 ">
   <div class="bg-yellow-200 p-6 rounded-lg shadow-lg w-96">
    <h2 class="text-2xl font-semibold text-center mb-4">Autentificare</h2>
  <div class="mb-4">
        <!-- <label class="block text-gray-700">Email</label> -->
        <input v-model="email" type="email" placeholder="Email" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
 <div class="mb-4">
        <!-- <label class="block text-gray-700">Parolă</label> -->
        <input v-model="password" type="password" placeholder="Parolă" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
 <button @click="login" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Login</button>
      <p v-if="errorMessage" class="text-red-500 text-center mt-2">{{ errorMessage }}</p>
      <div class="mt-4 text-center">
 <router-link to="/register" class="text-blue-500 hover:underline">Creare cont</router-link>

      </div>
    </div>
  </div>
</template>

