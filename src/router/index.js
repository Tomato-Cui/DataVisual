import { createRouter, createWebHistory } from 'vue-router'
import DataVisual from '../views/DataVisual.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: DataVisual
  },

  // 可以在这里添加更多路由
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: { name: 'home' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 