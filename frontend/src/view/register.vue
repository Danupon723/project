
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
        type="showPassword ? 'text' : 'password'"
        label="รหัสผ่าน"
        variant="outlined"
        prepend-inner-icon="mdi-lock"
        append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
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
      <div style="text-align:center">
        ไม่มีบัญชีผู้ใช้ <router-link to="/">สมัคร</router-link>
        </div>

    </v-card>
  </v-container>
</template>

<script setup>
import { ref , onMounted  } from 'vue'
import axios from 'axios'

const email = ref('')
const name_th = ref('')

const department_id = ref(null)
const group_id = ref(null)

const departments = ref([])
const groups = ref([])

const password = ref('')
const showPassword = ref(false)


const signIn = () => {
  console.log('Email:', email.value)
  console.log('name_th:', name_th.value)
  console.log('deparment:', department_id.value)
  console.log('group:', group_id.value)
  console.log('Password:', password.value)

}
const loadData = async () => {
  try {
    const depRes = await axios.get('http://localhost:7000/api/auth/departments')
    const grpRes = await axios.get('http://localhost:7000/api/auth/groups')
    // console.log(depRes.data);
    // console.log(grpRes.data);
    departments.value = depRes.data.dpmtitem
    groups.value = grpRes.data.groups

  } catch (err) {
    console.error("Error loading data:", err)
  }
}

onMounted(() => {
  loadData()
})
</script>
