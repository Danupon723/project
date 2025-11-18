import { createRouter, createWebHistory } from 'vue-router'

// Auth
import login from './view/login.vue'
import register from './view/register.vue'

// Admin
import adminIndex from './view/admin/index.vue'
import admindashbord from './view/admin/dashbord.vue'
import adminuser from './view/admin/users.vue'
import evaluation from './view/admin/evaluation.vue'
import mentadmin from './view/admin/ment.vue'
import admindirector from './view/admin/director.vue'
import table from './view/admin/tabledirector.vue'
import adduser from './view/admin/adduser.vue'



const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },

  // Admin routes
  {
    path: '/admin',
    component: adminIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: '', // /admin → redirect ไป dashboard
        redirect: '/admin/dashboard'
      },
      {
        path: 'dashboard', // /admin/dashboard
        name: 'admindashboard',
        component: admindashbord
      },
      {
        path: 'evaluation',
        name: 'evaluation',
        component: evaluation
      },
      {
        path: 'users',
        name: 'adminuser',
        component: adminuser
      },
      {
        path: 'ment',
        name: 'ment',
        component: mentadmin
      },
      {
        path: 'adduser',
        name: 'adduser',
        component: adduser
      },
      {
        path: 'tabledirector',
        name: 'tdirector',
        component: table
      },
      {
        path: 'director',
        name: 'director',
        component: admindirector
      },
    ]
  }
]



const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
