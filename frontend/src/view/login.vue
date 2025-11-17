<template>
  <div class="login-wrapper">
    <div class="login-card">
      <h1>เข้าสู่ระบบ</h1>

      <form @submit.prevent="login">
        <div class="form-group">
          <label>อีเมล</label>
          <input type="text" v-model="form.email" placeholder="กรอกอีเมล" />
        </div>

 <div class="form-group">
          <label>รหัสผ่าน</label>

          <div class="password-box ">
            <input 
              :type="showPassword ? 'text' : 'password'" 
              v-model="form.password"
              placeholder="กรอกรหัสผ่าน"
            />
            <button type="button" @click="showPassword = !showPassword" class="toggle-btn">
              {{ showPassword ? 'ซ่อน' : 'แสดง' }}
            </button>
          </div>
        </div>

        <div class="form-group">
          <label>ชื่อผู้ใช้</label>
          <input type="text" v-model="form.username" placeholder="กรอกชื่อผู้ใช้" />
        </div>
        
      <div class="form-group">
    <label>เลือกตำแหน่งงาน</label>
    <select v-model="selectedRole">
      <option disabled value="">-- กรุณาเลือกตำแหน่ง --</option>
      <option v-for="role in roles" :key="role.id" :value="role.name">
        {{ role.name }}
      </option>
    </select>

    <p>คุณเลือก: {{ selectedRole }}</p>
  </div>


        <button class="login-btn" type="submit" :disabled="loading">
          {{ loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ" }}
        </button>

        <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const form = reactive({
  username: "",
  password: "",
});

const showPassword = ref(false);
const loading = ref(false);
const errorMessage = ref("");

async function login() {
  loading.value = true;
  errorMessage.value = "";

  try {
    const res = await axios.post("http://localhost:7000/api/auth/login", {
      username: form.username,
      password: form.password,
    });

    const data = res.data;

    localStorage.setItem("token", data.accessToken);

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    // ตรวจ role เพื่อไปหน้าอื่น
    if (data.role === "admin") {
      router.push({ name: "indexadmin" });
    } else if (data.role === "Evaluator") {
      router.push({ name: "indexEmtor" });
    } else if (data.role === "Employee") {
      router.push({ name: "indexEmyee" });
    } else {
      router.push("/");
    }

  } catch (err) {
    errorMessage.value = err.response?.data?.message || "ไม่สามารถเข้าสู่ระบบได้";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* พื้นหลังกลางจอ */
.login-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eef2f7;
}

/* กล่อง Login */
.login-card {
  width: 380px;
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0px 10px 25px rgba(0,0,0,0.12);
  animation: fadeIn 0.4s ease;
}

h1 {
  text-align: center;
  margin-bottom: 25px;
  font-size: 26px;
  color: #333;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 6px;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 16px;
  transition: 0.2s;
}

.form-group input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 4px rgba(59,130,246,0.4);
}

.password-box {
  display: flex;
  gap: 10px;
}

.password-box input {
  flex: 1;
}

.toggle-btn {
  background: #d1d5db;
  border: none;
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s;
}

.toggle-btn:hover {
  background: #b9bec4;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: #3b82f6;
  color: white;
  border: none;
  font-size: 17px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
  transition: 0.2s;
}

.login-btn:hover {
  background: #2563eb;
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-text {
  margin-top: 12px;
  text-align: center;
  color: #e63946;
  font-size: 14px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
