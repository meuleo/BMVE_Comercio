<template>
  <br><br>
  <br><br>

  <button @click="adicionarContato">Add Contato</button>
  <br><br>
  <div v-for="item in contatos" :key="item.id">
    {{ item }} <span @click="removerContato(item.id)">eliminar</span>
  </div>


</template>

<script>
import * as api from "../services/api";

export default {
  data() {
    return {
      contatos: [],
    }
  },

  methods: {
    async adicionarContato () {
      const data = { nome: "João", contato: "123456789", endereco: "Rua A, 123" };

      // Adiciona o registro
      await api.adicionar(data, "Contatos"); // Espera a adição ser concluída

      this.contatos.push(data)
    },
    removerContato(id) {
      // Filtra o array para criar uma nova lista sem o contato que tem o ID especificado
      this.contatos = this.contatos.filter(contato => contato.id !== id);
    }
  },

  async mounted() {
    try {
      // Aguarda a inicialização do banco de dados
      await api.iniciarBaseDados();

      // Agora não precisamos do id, o IndexedDB cuidará disso
      
      // api.eliminar(1, "Contatos");

      this.contatos = await api.listar("Contatos")
      console.log(this.contatos)

    } catch (error) {
      console.error("Erro ao iniciar o banco de dados ou adicionar registro:", error);
    }
  }
}
</script>
