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
  {
    path: '/Create',
    name: 'Create',
    component: () => import('../views/Create')
  },
  {
    path: '/Log',
    name: 'Log',
    component: () => import('../components/content/Login')
  },
  {
    path: '/Update',
    name: 'Update',
    component: () => import('../components/content/Update')
  },
  {
    path: '/Author',
    name: 'Author',
    component: () => import('../components/content/Author')
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: () => import('../components/content/Profile')
  },
  {
    path: '/ArticleInfo',
    name: 'ArticleInfo',
    component: () => import('../components/content/ArticleInfo')
  },
  {
    path: '/Search',
    name: 'Search',
    component: () => import('../views/Search')
  },
  {
    path: '/TeamInfo',
    name: 'TeamInfo',
    component: () => import('../components/content/TeamInfo')
  },
  {
    path: '/DashBoard',
    name: 'DashBoard',
    component: () => import('../views/DashBoard')
  },
  {
    path: '/Message',
    name: 'Message',
    component: () => import('../components/content/Message')
  },
  {
    path: '/Manager',
    name: 'Manager',
    component: () => import('../components/content/Manager')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
