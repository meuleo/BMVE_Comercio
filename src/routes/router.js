// router.js
import { createRouter, createWebHashHistory } from 'vue-router'

// Componentes
import TheInicio from '../views/InicioView.vue'

// Rotas
const routes = [
  { path: '/', component: TheInicio },

  // Produtos
  { 
    path: '/produtos',
    component: () => import('../views/ProdutosView/ListarView.vue') 
  },
  { 
    path: '/produtos/adicionar',
    component: () => import('../views/ProdutosView/AdicionarView.vue')
  },

  // Funcionarios
  { 
    path: '/funcionarios',
    component: () => import('../views/FuncionariosView/ListarView.vue')
  },
  { 
    path: '/funcionarios/adicionar',
    component: () => import('../views/FuncionariosView/AdicionarView.vue')
  },
  { 
    path: '/funcionarios/editar/:id',
    component: () => import('../views/FuncionariosView/EditarView.vue')
  },

  // Clientes
  { 
    path: '/clientes',
    component: () => import('../views/ClientesView/ListarView.vue')
  },
  { 
    path: '/clientes/adicionar',
    component: () => import('../views/ClientesView/AdicionarView.vue')
  },
  { 
    path: '/clientes/editar/:id',
    component: () => import('../views/ClientesView/EditarView.vue')
  },

  // Fornecedores
  { 
    path: '/fornecedores',
    component: () => import('../views/FornecedoresView/ListarView.vue')
  },
  { 
    path: '/fornecedores/adicionar',
    component: () => import('../views/FornecedoresView/AdicionarView.vue')
  },
  { 
    path: '/fornecedores/editar/:id',
    component: () => import('../views/FornecedoresView/EditarView.vue')
  },

  // Compras
  { 
    path: '/compras',
    component: () => import('../views/ComprasView/ListarView.vue')
  },
  { 
    path: '/compras/adicionar',
    component: () => import('../views/ComprasView/AdicionarView.vue')
  },
  { 
    path: '/compras/editar/:id',
    component: () => import('../views/ComprasView/EditarView.vue')
  },

  // vendas
  { 
    path: '/vendas',
    component: () => import('../views/ComprasView/ListarView.vue')
  },
  { 
    path: '/vendas/adicionar',
    component: () => import('../views/ComprasView/AdicionarView.vue')
  },
  { 
    path: '/vendas/editar/:id',
    component: () => import('../views/ComprasView/EditarView.vue')
  },

  // estoque
  { 
    path: '/estoque',
    component: () => import('../views/ComprasView/ListarView.vue')
  },

  // Auth
  { 
    path: '/login',
    component: () => import('../views/LoginView/LoginView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
