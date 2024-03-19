<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <button @click="navigateToRegister">Register</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LoginService from '@/services/LoginService';

export default {
  name: 'LoginView',
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const login = async () => {
      try {
        //Get the response in variable and save the token in session storage
        const response = await LoginService.login(email.value, password.value);
        console.log(response);
        //Save the token in session storage as jwttoken and navigate to home page also set loggedIn state to true
        sessionStorage.setItem('loggedIn', true);
        sessionStorage.setItem('jwttoken', response.data);
        router.push('/home');
      } catch (error) {
        console.error(error);
      }
    };

    const navigateToRegister = () => {
      router.push('/register');
    };

    return {
      email,
      password,
      login,
      navigateToRegister
    };
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: bold;
}

input[type="email"],
input[type="password"] {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
