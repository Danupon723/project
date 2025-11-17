<template>
  <v-container>
    <h2 class="text-h5 mb-4">แบบฟอร์มประเมิน</h2>

    <!-- 🔵 ฟอร์มกรอกข้อมูล -->
    <v-card class="pa-4 mb-4">
      <v-row >
        <v-col cols="12" md="6">
             <h6 class="text-h6">เพิ่มหัวข้อการประเมิน</h6>
          <v-text-field
           label="เพิ่มหัวข้อประเมิน"
            v-model="form.topic"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="6">
            <h6 class="text-h6">เพิ่มหัวข้อย่อย</h6>
          <v-text-field
            v-model="form.subtopic"
            label="เพิ่มหัวข้อย่อย"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="6">
            <h6 class="text-h6">คำอธิบายหัวข้อการประเมิน</h6>
          <v-text-field
            v-model="form.description"
            label="คำอธิบายหัวข้อการประเมิน"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="6">
            <h6 class="text-h6">คำอธิบายหัวข้อย่อย</h6>
          <v-text-field
            v-model="form.subdescription"
            label="คำอธิบายหัวข้อย่อย"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" md="6">
            <h6 class="text-h6">รูปเเบบการประเมิน</h6>
        <v-select v-model="formselect" :items="items"  variant="outlined">
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :title="null">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-select>
             </v-col>
        <v-col cols="12" md="6">
            <h6 class="text-h6">น้ำหนักคะเเนน(%)</h6>
          <v-text-field
            v-model="form.subdescription"
            label="น้ำหนักคะเเนน(%)"
            variant="outlined"
          />
        </v-col>
      </v-row>

      <v-btn color="primary" class="mt-4" @click="addToTable">
        บันทึกข้อมูล
      </v-btn>
    </v-card>

    <!-- 🟢 ตารางแสดงข้อมูลที่บันทึก -->
    <v-card class="pa-4">
      <v-data-table
        :headers="headers"
        :items="savedData"
        class="elevation-1"
      >
        <template #item.actions="{ index }">
          <v-btn color="red" variant="text" @click="removeRow(index)">
            ลบ
          </v-btn>
        </template>
      </v-data-table>

      <v-btn
        color="primary"
        class="mt-4"
        :disabled="savedData.length === 0"
        @click="sendToBackend"
      >
        บันทึกข้อมูล
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
import { reactive, ref } from "vue";
import axios from "axios";

// ฟอร์มกรอกข้อมูล
const form = reactive({
  topic: "",
  description: "",
  subtopic: "",
  subdescription: "",
});

// ตารางเก็บข้อมูลชั่วคราว
const savedData = ref([]);

// คอลัมน์ของตาราง
const headers = [
  { title: "หัวข้อประเมิน", key: "topic" },
  { title: "คำอธิบาย", key: "description" },
  { title: "หัวข้อย่อย", key: "subtopic" },
  { title: "คำอธิบายย่อย", key: "subdescription" },
  { title: "จัดการ", key: "actions", align: "center" },
];

// ➕ เพิ่มข้อมูลลงตาราง
function addToTable() {
  if (!form.topic || !form.subtopic) {
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  savedData.value.push({
    topic: form.topic,
    description: form.description,
    subtopic: form.subtopic,
    subdescription: form.subdescription,
  });

  // reset ฟอร์ม
  form.topic = "";
  form.description = "";
  form.subtopic = "";
  form.subdescription = "";
}

// ❌ ลบแถว
function removeRow(index) {
  savedData.value.splice(index, 1);
}

// 🟢 ส่งข้อมูลทั้งหมดไป backend
async function sendToBackend() {
  try {
    const response = await axios.post(
      "http://localhost:7000/api/assessment/part5",
      savedData.value
    );

    console.log("บันทึกสำเร็จ:", response.data);
    alert("ส่งข้อมูลไปฐานข้อมูลสำเร็จ!");

    // หลังส่ง ล้างตาราง
    savedData.value = [];

  } catch (error) {
    console.error(error);
    alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
  }
}
</script>

<style scoped>
</style>
