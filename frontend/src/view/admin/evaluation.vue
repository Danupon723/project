<template>
  <v-container>
    <!-- ตารางหัวข้อการประเมิน -->
    <v-data-table
      :headers="headers"
      :items="topics"
      class="elevation-1"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>หัวข้อการประเมินทั้งหมด</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" :to="'/admin/ment'">
          เพิ่มหัวข้อการประเมิน
          </v-btn>
        </v-toolbar>
      </template>

      <template #item.actions="{ item }">
        <v-btn color="primary" @click="openEditDialog(item)">
          แก้ไขหัวข้อ
        </v-btn>
      </template>
    </v-data-table>

    <!-- 🔵 Dialog แก้ไขหัวข้อ -->
    <v-dialog v-model="editDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h6">
          แก้ไขหัวข้อการประเมิน
        </v-card-title>

        <v-card-text>
          <v-text-field v-model="form.name" label="ชื่อหัวข้อการประเมิน" />
          <v-text-field v-model="form.year" label="ปี" />
          <v-text-field v-model="form.datestart" type="date" label="วันเริ่ม" />
          <v-text-field v-model="form.dateend" type="date" label="วันปิด" />
          <v-textarea v-model="form.description" label="คำอธิบาย" rows="2" />
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn text @click="editDialog = false">ยกเลิก</v-btn>
          <v-btn color="primary" @click="saveEdit">บันทึก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 🟢 Dialog เพิ่มหัวข้อ -->
    <v-dialog v-model="addDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h6">
          เพิ่มหัวข้อการประเมินใหม่
        </v-card-title>

        <v-card-text>
          <v-text-field v-model="form.name" label="ชื่อหัวข้อการประเมิน" />
          <v-text-field v-model="form.year" label="ปี" />
          <v-text-field v-model="form.datestart" type="date" label="วันเริ่ม" />
          <v-text-field v-model="form.dateend" type="date" label="วันปิด" />
          <v-textarea v-model="form.description" label="คำอธิบาย" rows="2" />
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn text @click="addDialog = false">ยกเลิก</v-btn>
          <v-btn color="success" @click="addTopic">บันทึก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "axios";   // ✅ ต้อง import axios ก่อน

// ต้องเป็น ref เพื่อให้ push ได้และ table อัปเดตได้
const topics = ref([]);

const headers = [
  { title: "หัวข้อการประเมิน", key: "name" },
  { title: "คำอธิบาย", key: "description" },
  { title: "หัวข้อย่อย", key: "subtopic" },
  { title: "คำอธิบาย", key: "subdescription" },
  { title: "จัดการ", key: "actions", align: "center" },
];

const users = [
  { name: 'การเรียนการสอน', date:'11/09/2025 ', process:''},
]

const addDialog = ref(false);
const editDialog = ref(false);
const selectedId = ref(null);

// ฟอร์มกลางที่ใช้ทั้งเพิ่ม/แก้ไข
const form = reactive({
  name: "",
  year: "",
  datestart: "",
  dateend: "",
  description: "",
});

// reset ค่า form
function resetForm() {
  Object.assign(form, {
    name: "",
    year: "",
    datestart: "",
    dateend: "",
    description: "",
  });
}

// เปิด Dialog เพิ่มหัวข้อ
function openAddDialog() {
  resetForm();
  addDialog.value = true;
}

// เปิด Dialog แก้ไข
function openEditDialog(item) {
  selectedId.value = item.id;

  Object.assign(form, {
    name: item.name,
    year: item.year || "",
    datestart: item.date?.split(" - ")[0] || "",
    dateend: item.date?.split(" - ")[1] || "",
    description: item.description || "",
  });

  editDialog.value = true;
}

// 🟢 ส่งข้อมูลไป backend
async function addTopic() {
  const payload = {
    name: form.name,
    year: form.year,
    datestart: form.datestart,
    dateend: form.dateend,
    description: form.description
  };

  console.log("ข้อมูลที่จะส่งไป backend:", payload);

  try {
    const response = await axios.post("http://localhost:7000/api/topics", payload);

    console.log("ผลลัพธ์จาก backend:", response.data);

    // เพิ่มลงในตาราง
    topics.value.push({
      id: response.data.id,
      ...payload,
      date: `${form.datestart} - ${form.dateend}`,
      weight: 0,
    });

    addDialog.value = false;
    resetForm();
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
  }
}
</script>
