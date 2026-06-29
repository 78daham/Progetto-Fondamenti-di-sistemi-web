import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/approfondimento', name: 'approfondimento', component: () => import('../views/Approfondimento.vue') },
    { path: '/dati', name: 'dati', component: () => import('../views/DatiView.vue') },
    { path: '/gestisci', name: 'gestisci', component: () => import('../views/GestisciView.vue') }
  ]
})

export default router