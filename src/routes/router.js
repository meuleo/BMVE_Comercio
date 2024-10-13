// router.js
import { createRouter, createWebHashHistory } from 'vue-router'

// Componentes
import TheInicio from '../views/InicioView.vue'

// Rotas
const routes = [
  { path: '/', component: TheInicio },
  // { 
  //  path: '/ticar', 
  //  component: () => import('../views/TicadosView.vue') 
  // },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
