<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <v-card width="400" class="pa-6">

      <h2 class="text-center mb-6">เข้าสู่ระบบ</h2>

      <v-text-field
        v-model="email"
        label="อีเมล"
        variant="outlined"
        prepend-inner-icon="mdi-email"
      />

      <v-text-field
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        label="รหัสผ่าน"
        variant="outlined"
        prepend-inner-icon="mdi-lock"
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="showPassword = !showPassword"
      />

     

      <v-btn
        color="primary"
        block
        class="mt-4"
        @click="signIn"
      >
        เข้าสู่ระบบ
      </v-btn><br>
      <center>ไม่มีบัญชีผู้ใช้ <router-link to="/register"> สมัคร</router-link></center>

    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const remember = ref(false)

const signIn = () => {
  console.log('Email:', email.value)
  console.log('Password:', password.value)
  console.log('Remember:', remember.value)
}
</script>
