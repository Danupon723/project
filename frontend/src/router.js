import { createRouter, createWebHistory } from 'vue-router'
import login from './view/login.vue'
import adminIndex from './view/admin/index.vue'
import admindashbord from './view/admin/dashbord.vue'
import adminuser from './view/admin/users.vue'
import register from './view/evaluation.vue'
const routes = [
    {
        path: '/',
        name: 'login',
        component: login
    },
    {
        path: '/admin',
        component: adminIndex,
        meta: { requiresAuth: true },
        children: [
            {
                path: 'dashbord',
                name: 'admindashbord',
                component: admindashbord
            },
            {
                path: 'users',
                name: 'user',
                component: adminuser
            },
            {
                path: 'register',
                name: 'register',
                component: register
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
