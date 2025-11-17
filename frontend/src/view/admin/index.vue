<template>
  <v-app>
    <!-- แถบด้านบน -->
    <v-app-bar color="grey-darken-1" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>ระบบประเมินนบุคคล</v-toolbar-title>
<router-link to="/">      
        <v-btn
          type="submit"
          block
          color="#B71C1C"
          size="large"
          class="text-white"
        >
          Logout
        </v-btn>
</router-link>  
    </v-app-bar>

    <!-- แถบด้านข้าง -->
    <v-navigation-drawer v-model="drawer" app color="grey-lighten-1">
      <v-list density="compact">
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :title="item.title"
          @click="selectMenu(item)"
        />
      </v-list> 
    </v-navigation-drawer>

    <!-- เนื้อหาหลัก -->
    <v-main>
      <v-container>
        <v-card class="pa-5" max-width="1100">
          <v-card-text>
            <!-- ✅ แสดง component ตามเมนู -->
            <component :is="currentPage.component" />
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>

import { ref } from 'vue'
import admindashbord from './dashbord.vue'
import adminevaluation from './evaluation.vue'
import adminuser from './users.vue'
import assessmentadmin from './assessment.vue'

const drawer = ref(true)
const items = [
  { title: 'แดชบอร์ด', icon: 'mdi-login', component: admindashbord },
  { title: 'การประเมิน', icon: 'mdi-login', component: adminevaluation },
  { title: 'เเบบประเมิน', icon: 'mdi-login', component: assessmentadmin },
  { title: 'ผู้ใช้', icon: 'mdi-login', component: adminuser },
]
const currentPage = ref(items[0])

function selectMenu(item) {
  currentPage.value = item
}

</script>
