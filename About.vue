<template>
  <v-app>
    <!-- แถบด้านบน -->
    <v-app-bar color="grey-darken-1" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>My App Menu</v-toolbar-title>
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

import { ref, onMounted } from 'vue'
import axios from 'axios'
import loing from './dash.vue'
import login from './dashbord.vue'
import form from './login.vue'
import singin from './SigIn.vue'
import loginJob from './loginJob.vue'
import data from './data.vue'
import Addmin from './Addmin.vue'
import search from './search.vue'
import add from './evaluation.vue'
const drawer = ref(true)
const items = [
  { title: 'แดชบอร์ด', icon: 'mdi-login', component: Addmin },
  { title: 'ค้นหาข้อมูล', icon: 'mdi-login', component: data },
  { title: 'เพิ่มหัวข้อการประเมิน', icon: 'mdi-login', component: add },
]
const currentPage = ref(items[0])

function selectMenu(item) {
  currentPage.value = item
}

</script>
