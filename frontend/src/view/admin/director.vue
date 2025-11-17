<template>
  <v-container>
    <h2 class="text-h5 mb-4">เพิ่มรายชื่อผู้ประเมิน</h2>

    <!-- ฟอร์มกรอกข้อมูล -->
    <v-card class="pa-4 mb-4">
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            label="รูปแบบการประเมิน 1"
            v-model="form.format1"
            :items="items1"
            variant="outlined"
          />
        </v-col>
          
        <v-col cols="12" md="6">
          <v-select
            label="รูปแบบการประเมิน 2"
            v-model="form.format2"
            :items="items2"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            label="รูปแบบการประเมิน 3"
            v-model="form.format3"
            :items="items3"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            label="รูปแบบการประเมิน 4"
            v-model="form.format4"
            :items="items4"
            variant="outlined"
          />
        </v-col>
      </v-row>

      <v-btn color="primary" class="mt-4" @click="addToTable">
        บันทึกข้อมูล
      </v-btn>
    </v-card>

  </v-container>
</template>

<script setup>
import { reactive } from "vue";
import axios from "axios";

// รายการเลือกของแต่ละ select
const items1 = ['มี/ไม่มี', '1-4', 'URL'];
const items2 = ['มี/ไม่มี', '1-4', 'URL'];
const items3 = ['มี/ไม่มี', '1-4', 'URL'];
const items4 = ['มี/ไม่มี', '1-4', 'URL'];

// ฟอร์มกรอกข้อมูล
const form = reactive({
  format1: items1[0],
  format2: items2[0],
  format3: items3[0],
  format4: items4[0],
  position: "",
  email: "",
  phone: "",
});

// ตัวอย่างฟังก์ชันเพิ่มลงตาราง
function addToTable() {
  console.log("เลือก:", form.format1, form.format2, form.format3, form.format4);
  // สามารถเอาไป push ลง savedData.value หรือส่ง backend ต่อได้
}

// ฟังก์ชันส่งข้อมูลไป backend
async function sendToBackend() {
  try {
    const response = await axios.post(
      "http://localhost:7000/api/evaluators",
      form
    );
    console.log("บันทึกสำเร็จ:", response.data);
    alert("ส่งข้อมูลไปฐานข้อมูลสำเร็จ!");
  } catch (error) {
    console.error(error);
    alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
  }
}
</script>
