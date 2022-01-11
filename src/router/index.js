import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Square',
    name: 'Square',
    component: () => import('../views/Square')
  },
  {
    path: '/Teams',
    name: 'Teams',
    component: () => import('../views/Teams')
  },
  {
    path: '/Favorites',
    name: 'Favorites',
    component: () => import('../views/Favorites')
  },
  {
    path: '/RecycleBin',
    name: 'RecycleBin',
    component: () => import('../views/RecycleBin')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
