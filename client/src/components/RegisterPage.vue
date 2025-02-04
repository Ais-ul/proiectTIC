<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const auth = getAuth();
const router = useRouter();

const register = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    router.push("/login");
  } catch (error) {
    errorMessage.value = "Eroare la înregistrare!";
  }
};
</script>

<template>
  <div class="flex items-center justify-center  bg-gray-100">
    <div class="bg-green-200 p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-semibold text-center mb-4">Înregistrare</h2>
      <div class="mb-4">
        <!-- <label class="block text-gray-700">Email</label> -->
        <input v-model="email" type="email" placeholder="Email" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div class="mb-4">
        <!-- <label class="block text-gray-700">Parolă</label> -->
        <input v-model="password" type="password" placeholder="Parolă" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <button @click="register" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Înregistrează-te</button>
      <p v-if="errorMessage" class="text-red-500 text-center mt-2">{{ errorMessage }}</p>
      <div class="mt-4 text-center">
       <router-link to="/login" class="text-blue-500 hover:underline">Înapoi la autentificare</router-link>
      </div>
    </div>
  </div>
</template>
