<template>
  <div class="register-view">
    <h1>Register</h1>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div class="form-group">
        <label for="mobile">Mobile:</label>
        <input type="tel" id="mobile" v-model="mobile" required>
      </div>
      <div class="form-group">
        <button type="submit">Register</button>
      </div>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import RegisterUserService from '@/services/RegisterUserService';

export default {
  name: 'RegisterView',
  data() {
    return {
      email: '',
      username: '',
      password: '',
      mobile: '',
      error: '',
    };
  },
  methods: {
    async registerUser() {
      try {
        //Reset the error message
        this.error = '';
        //Create user object and then send it to service to register user
        const response =
        await RegisterUserService.registerUser({
          email: this.email,
          username: this.username,
          password: this.password,
          mobile: this.mobile,
        });
        // Registration successful, redirect to login page
        this.$router.push('/');
      } catch (error) {
        // Registration failed, display error message
        console.log(error);
        this.error = error.message;
      }
    },
  },
};
</script>

<style scoped>
.register-view {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="email"],
input[type="text"],
input[type="password"],
input[type="tel"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
