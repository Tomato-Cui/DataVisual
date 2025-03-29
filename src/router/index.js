import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import DataVisual from '../views/DataVisual.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: DataVisual
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/datavisual',
    name: 'datavisual',
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