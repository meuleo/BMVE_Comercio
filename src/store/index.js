import { createStore } from 'vuex'

const store = createStore({
  state: {
    funcionarios: [],
    clientes: [],
    fornecedores: [],

    
    compras: [],
    vendas: [],
    estoque: [],
    produtos: [],
    
  },
  mutations: {
   
  },
  actions: {
    // Suas ações aqui
  },
  getters: {
    // Seus getters aqui
  }
})

export default store