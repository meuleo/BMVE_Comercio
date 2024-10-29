<template>
  <div>
    <h2>Carregar Imagens</h2>
    <input type="file" multiple @change="handleFileUpload" accept="image/*" />
    <button @click="uploadImages">Enviar Imagens</button>
  </div>

  <br><br><br>
  <div v-if="imagens.length > 0" style="display: flex; flex-wrap: wrap;">
      <div v-for="imagem in imagens" :key="imagem.contatoId" width="200" style="margin: 15px;">
        <img :src="imagem.imagem" alt="Imagem do Contato" width="200" />
      </div>
    </div>
</template>

<script>
import * as api from "../services/api"; // Importando a função de carregar imagens

export default {
  data() {
    return {
      selectedImages: [], // Armazenará as imagens selecionadas
      imagens: []
    };
  },
  methods: {
    handleFileUpload(event) {
      // Pega as imagens selecionadas
      const files = event.target.files;
      this.selectedImages = [];

      // Converte os arquivos para URLs (ou Blob, conforme necessário)
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (e) => {
          this.selectedImages.push(e.target.result); // Adiciona a URL da imagem ao array
        };

        reader.readAsDataURL(file); // Lê o arquivo como URL
      }
    },
    async uploadImages() {
      if (this.selectedImages.length > 0) {
        try {
          // Chama a função para carregar as imagens
          await api.carregarImagens(this.selectedImages, 1, "Imagens");
          console.log("Imagens carregadas com sucesso!");
        } catch (error) {
          console.error("Erro ao carregar imagens:", error);
        }
      } else {
        alert("Por favor, selecione pelo menos uma imagem.");
      }
    },
  },

  async mounted() {
    console.log("chamando...")
    await api.iniciarBaseDados();
    
    const data = { nome: "João", contato: "123456789", endereco: "Rua A, 123" };

    // Adiciona o registro{
    await api.adicionar(data, "Contatos"); // Espera a adição ser concluída}

    this.imagens = await api.listar("Imagens") 

  },

};
</script>
