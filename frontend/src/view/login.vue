<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const remember = ref(false)

const signIn = () => {
  console.log('Email:', email.value)
  console.log('Password:', password.value)
  console.log('Remember me:', remember.value)
}
</script>

<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card class="pa-8" max-width="400" elevation="6" rounded="xl">
      <v-card-title class="text-h5 font-weight-bold text-center">
        LogIn
      </v-card-title> 
      <v-card-subtitle class="text-center mb-6">
       ป้อนข้อมูลประจำตัวของคุณเพื่อเข้าถึงบัญชีของคุณ 
      </v-card-subtitle>

      <v-form @submit.prevent="signIn">
        <v-text-field
          v-model="email"
          label="Email Address"
          type="email"
          variant="outlined"
          density="comfortable"
          class="mb-4"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          variant="outlined"
          density="comfortable"
          required
          class="mb-2"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
        ></v-text-field>

        <div class="d-flex align-center justify-space-between mb-6">
          <v-checkbox
            v-model="remember"
            label="Remember me"
            hide-details
            density="compact"
          ></v-checkbox>
          <a href="#" class="text-blue text-decoration-none text-caption">
            Forgot password?
          </a>
        </div>
              <router-link to="/About">      
        <v-btn
          type="submit"
          block
          color="indigo"
          size="large"
          class="text-white"
        >
          LogIn
        </v-btn></router-link>  

        <div class="text-center mt-4 text-caption">
          Don’t have an account?
          <router-link to="/SigIn"> Creat account?</router-link>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-card {
  background-color: white;
}
body {
  background-color: #f8f9fc;
}
</style>
