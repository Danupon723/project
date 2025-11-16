import {createRouter,creatWebhistory} from 'vue-router'
import login from './view/login.vue'


const routes = [
    {path:'login' , Component:login},
]



const router = createRouter({
    history :creatWebhistory(),
    routes
})

export default router