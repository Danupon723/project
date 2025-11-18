<template>
  <v-container>
    <!-- 🧾 Toolbar -->
    <v-toolbar flat>
      <v-toolbar-title>ข้อมูลผู้ใช้งาน</v-toolbar-title>

      <!-- ✅ ปุ่มเพิ่มข้อมูล + เมนู -->
  <v-menu>
        <template #activator="{ props }">
          <router-link to="/admin/adduser"><v-btn color="primary" v-bind="props">
            เพิ่มรายชื่อ
          </v-btn></router-link>
        </template>
      </v-menu>
    </v-toolbar>

    <!-- 📋 ตารางข้อมูล -->
    <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page="10"
      v-model:page="page"
      class="elevation-1"
    >
      <!-- ปุ่มแก้ไข / ลบ -->
      <template #item.process="{ item }">
        <v-container class="pa-6">
          <v-btn
            color="primary"
            style="font-size: 10px; padding: 10px 10px;"
            @click="openEdit(item)"
          >
            แก้ไขข้อมูล
          </v-btn>

          <v-btn
            color="error"
            style="font-size: 10px; padding: 10px 10px;"
            @click="confirmDelete(item)"
          >
            ลบ
          </v-btn>
        </v-container>
      </template>

      <!-- ✅ Dialog ลบข้อมูล -->
      <template #bottom>

  <v-dialog v-model="dialog" width="400" scrim="transparent">
    <v-card>
      <v-card-title>แก้ไขข้อมูล</v-card-title>
      <v-card-text>
        <v-text-field v-model="name" label="ชื่อ" variant="outlined" />
        <v-text-field v-model="yere" label="แผนก" variant="outlined" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="dialog = false">ยกเลิก</v-btn>
        <v-btn color="success" @click="saveData">บันทึก</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

        
        <v-dialog v-model="deleteDialog" max-width="400">
          <v-card>
            <v-card-title class="text-h6">ยืนยันการลบข้อมูล</v-card-title>
            <v-card-text>
              ต้องการลบ "{{ selectedUser?.Fristname }}" หรือไม่?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="deleteDialog = false">ยกเลิก</v-btn>
              <v-btn color="error" @click="deleteUser">ลบ</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>

      <!-- ✅ Footer (pagination) -->
      <template #footer>
        <div class="d-flex justify-end pa-2">
          <v-btn
            :disabled="page === 1"
            @click="page--"
            color="primary"
            icon
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <span class="mx-2">หน้า {{ page }} / {{ totalPages }}</span>

          <v-btn
            :disabled="page >= totalPages"
            @click="page++"
            color="primary"
            icon
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const search = ref('')
const page = ref(1)
const dialog = ref(false)
const deleteDialog = ref(false)
const selectedUser = ref(null)
const name = ref('')
const yere = ref('')
const headers = [
  { title: 'ลำดับ', key: 'number' },
  { title: 'ชื่อ', key: 'Fristname' },
  { title: 'ปี', key: 'yere' },
  { title: 'เวลาเริ่ม', key: 'startdate' },
  { title: 'เวลาจบ', key: 'enddate' },
  { title: 'ดำเนินการ', key: 'process' },
]

const users = ref([
  { number: '1', Fristname: 'สมชาย', yere: '2009', startdate: '14:00', enddate: '15:00' },
])

// ✅ รวมหน้าทั้งหมด
const totalPages = computed(() => Math.ceil(users.value.length / 5))

// ✅ ฟังก์ชันลบ
function confirmDelete(item) {
  selectedUser.value = item
  deleteDialog.value = true
}
function deleteUser() {
  users.value = users.value.filter(u => u.number !== selectedUser.value.number)
  deleteDialog.value = false
}

function saveData() {
  dialog.value = false
}



function openEdit(item) {
  name.value = item.Fristname
  yere.value = item.yere
  dialog.value = true
}
function goAddUser() {
  router.push('/admin/adduser')
}
</script>
