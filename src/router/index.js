import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Preview from '@/views/Preview/index.vue'
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'home',
      component: Home
    },
    {
      path: '/preview',
      name: 'preview',
      component: Preview
    }
  ]
})
router.beforeEach((to, from) => {
  if(to.fullPath==='/'){
    return true
  }
  console.log(to)
  console.log(from)
  const userStore = useUserStore()
  if(userStore.userid===''){
    console.log("未登录")
    router.push('/')
    return false
  }
})
export default router
