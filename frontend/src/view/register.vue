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
        v-model="name_th"
        type="text"
        label="ชื่อ"
        variant="outlined"
        prepend-inner-icon="mdi-account"
      />

      <v-select
        v-model="department_id"
        :items="departments"
        item-title="name_th"
        item-value="id"
        label="แผนก (Department)"
        variant="outlined"
        prepend-inner-icon="mdi-office-building"
        class="mb-4"
      />

      <v-select
        v-model="group_id"
        :items="groups"
        item-title="name_th"
        item-value="id"
        label="กลุ่มงาน (Group)"
        variant="outlined"
        prepend-inner-icon="mdi-account-group"
        class="mb-4"
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
      </v-btn>

      <div style="text-align:center" class="mt-2">
        ไม่มีบัญชีผู้ใช้ <router-link to="/">สมัคร</router-link>
      </div>

    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()

const email = ref('')
const name_th = ref('')
const department_id = ref(null)
const group_id = ref(null)
const password = ref('')
const showPassword = ref(false)

const departments = ref([])
const groups = ref([])

// โหลด dropdown data
const loadData = async () => {
  try {
    const depRes = await axios.get('http://localhost:7000/api/auth/departments')
    const grpRes = await axios.get('http://localhost:7000/api/auth/groups')
    departments.value = depRes.data.dpmtitem
    groups.value = grpRes.data.groups

  } catch (err) {
    console.error("Error loading data:", err)
  }
}

// ฟังก์ชัน register
const signIn = async () => {
  const payload = {
    email: email.value,
    name: name_th.value,
    department: department_id.value,
    group_id: group_id.value,
    password: password.value
  }

  console.log('Payload:', payload)

  try {
    const response = await axios.post('http://localhost:7000/api/auth/register', payload)
    console.log('Register Success:', response.data)
    if(response.data.success){
      router.push('login')
    }
    // ตัวอย่าง: router.push('/login')
  } catch (err) {
    console.error('Register Error:', err.response?.data || err.message)
  }
}

onMounted(() => {
  loadData()
})
</script>
