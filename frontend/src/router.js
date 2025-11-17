import { createRouter, createWebHistory } from 'vue-router'

// Auth
import login from './view/login.vue'
import register from './view/register.vue'

// Admin
import adminIndex from './view/admin/index.vue'
import admindashbord from './view/admin/dashbord.vue'
import adminuser from './view/admin/users.vue'
import evaluation from './view/admin/evaluation.vue'
import assessmentadmin from './view/admin/assessment.vue'


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
                path: 'dashbord',
                name: 'admindashbord',
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
                path: 'assessment',
                name: 'assess',
                component: assessmentadmin
            },
        ]
    },

   
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
