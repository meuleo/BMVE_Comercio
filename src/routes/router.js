// router.js
import { createRouter, createWebHashHistory } from 'vue-router'

// Componentes
import NomesView from '../views/NomesView.vue'

// Rotas
const routes = [
  { path: '/', component: NomesView },
  { 
    path: '/ticar', 
    component: () => import('../views/TicadosView.vue') 
  },
  { 
    path: '/ptrimestre', 
    component: () => import('../views/PorTrimestreView.vue')
  },
  { 
    path: '/pmembros', 
    component: () => import('../views/PorMembrosView.vue')
  },
  { 
    path: '/pmembros-pdf', 
    component: () => import('../views/PorMembrosPDFView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
