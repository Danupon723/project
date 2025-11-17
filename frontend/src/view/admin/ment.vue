<template>
  <v-container>
    <h2 class="text-h5 mb-4">แบบฟอร์มประเมิน</h2>

    <!-- ฟอร์มกรอกข้อมูล -->
    <v-card class="pa-4 mb-4">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            label="เพิ่มหัวข้อประเมิน"
            v-model="form.topic"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            label="เพิ่มหัวข้อย่อย"
            v-model="form.subtopic"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            label="คำอธิบายหัวข้อการประเมิน"
            v-model="form.description"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            label="คำอธิบายหัวข้อย่อย"
            v-model="form.subdescription"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            label="รูปแบบการประเมิน"
            v-model="form.format"
            :items="items"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            type="number"
            label="น้ำหนักคะแนน(%)"
            v-model="form.weight"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" md="6 ">
        <v-file-input label="File input" variant="outlined"></v-file-input>
        </v-col>
      </v-row>

      <v-btn color="primary" class="mt-4" @click="addToTable">
        บันทึกข้อมูล
      </v-btn>
    </v-card>

    <!-- ตารางแสดงข้อมูล -->
    <v-card class="pa-4">
      <v-data-table
        :headers="headers"
        :items="savedData"
        class="elevation-1"
        item-key="id"
      >
        <template #item.actions="{ item }">
          <v-btn color="red" variant="text" @click="removeRow(item.id)">
            ลบ
          </v-btn>
        </template>
      </v-data-table>

      <v-btn
        color="green"
        class="mt-4"
        :disabled="savedData.length === 0"
        @click="sendToBackend"
      >
        ส่งข้อมูลทั้งหมดไปฐานข้อมูล
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
import { reactive, ref } from "vue";
import axios from "axios";

// รูปแบบการประเมิน
const items = ['มี/ไม่มี', '1-4', 'URL'];

// ฟอร์มกรอกข้อมูล
const form = reactive({
  topic: "",
  description: "",
  subtopic: "",
  subdescription: "",
  format: items[0],
  weight: 0,
});

// ตารางเก็บข้อมูลชั่วคราว
const savedData = ref([]);

// ตัวนับ id สำหรับแต่ละ row
let nextId = 1;

// คอลัมน์ของตาราง Vuetify 3
const headers = [
  { title: "หัวข้อประเมิน", value: "topic" },
  { title: "คำอธิบาย", value: "description" },
  { title: "หัวข้อย่อย", value: "subtopic" },
  { title: "คำอธิบายย่อย", value: "subdescription" },
  { title: "รูปแบบ", value: "format" },
  { title: "น้ำหนัก(%)", value: "weight" },
  { title: "จัดการ", value: "actions", align: "center" },
];

// ➕ เพิ่มข้อมูลลงตาราง
function addToTable() {
  if (!form.topic || !form.subtopic) {
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  savedData.value.push({
    id: nextId++,
    topic: form.topic,
    description: form.description,
    subtopic: form.subtopic,
    subdescription: form.subdescription,
    format: form.format,
    weight: form.weight,
  });

  // reset form
  form.topic = "";
  form.description = "";
  form.subtopic = "";
  form.subdescription = "";
  form.format = items[0];
  form.weight = 0;
}

// ❌ ลบแถวโดย id
function removeRow(id) {
  savedData.value = savedData.value.filter(item => item.id !== id);
}

// 🟢 ส่งข้อมูลทั้งหมดไป backend
async function sendToBackend() {
  try {
    console.log(savedData.value)
    // const response = await axios.post(
    //   "http://localhost:7000/api/assessment/part5",
    //   savedData.value
    // );

    console.log("บันทึกสำเร็จ:", response.data);
    alert("ส่งข้อมูลไปฐานข้อมูลสำเร็จ!");

    // หลังส่ง ล้างตาราง
    savedData.value = [];
    nextId = 1;
  } catch (error) {
    // console.error(error);
    // alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
  }
}
</script>

<style scoped>
</style>
