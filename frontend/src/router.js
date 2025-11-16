import {createRouter,creatWebhistory} from 'vue-router'
import login from './view/login.vue'
import adminIndex from './view/admin/index.vue'
import admindashbord from './view/admin/dashbord.vue'
import adminuser from './view/admin/users.vue'
import { path } from '../../backend/app'
import { Children, Component } from 'react'


const routes = [
    {
        path:'/' ,
        name: login , 
        Component:login
    },
    {
        path:'/admin',
        Component:adminIndex , 
        meta: {requiresAuth : true} , 
        Children:[
            {
            path:'dashbord' , 
            name : 'admindashbord' ,
            component: admindashbord
            } , 
            {
            path:'user' , 
            name : 'user' ,
            component: adminuser
            } , 

    ]
    }
]



const router = createRouter({
    history :creatWebhistory(),
    routes
})

export default router