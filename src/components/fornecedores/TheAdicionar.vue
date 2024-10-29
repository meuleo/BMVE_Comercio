<template>
    
  <!--  Sidebar End -->
  <!--  Main wrapper -->
  <div  class="body-wrapper" 
        style="background-size: cover;
        background-position: center;
        height: 300px;
        background-image: url('/fundo-1.jpg');
        ">
   
    <!-- header aqui -->
     <TheHeader/>

    <div class="container-fluid">
        <div class="mb-4">
          <h5 class="pt-2">
            <span style="background: rgba(255,255,255,0.9);" class="p-2 rounded-3">
              Fornecedores/adicionar
            </span>
          </h5>
        </div>
      <!--  Row 1 -->
        <div class="col-lg-12 d-flex align-items-stretch">
          <div class="card w-100" style="background: rgba(255,255,255,0.96);">
              <div class="p-4">
                <div class="mb-3">back</div>
            </div>
            <div class="card-body p-4" style="height: 58vh; overflow: auto; ">
              <form @submit.prevent="adicionar">
              <div class="row">
                <div class="col-lg-6 col-md-6 mb-3">
                  <label for="nome" class="form-label">Nome</label>
                  <input
                    type="text"
                    v-model="fornecedor.nome"
                    id="nome"
                    class="form-control"
                    required
                  />
                </div>

                <div class="col-lg-6 col-md-6 mb-3">
                  <label for="contato" class="form-label">NIF</label>
                  <input
                    type="number"
                    v-model="fornecedor.nif"
                    id="contato"
                    class="form-control"
                    required
                  />
                </div>

                <div class="col-lg-6 col-md-6 mb-3">
                  <label for="contato" class="form-label">Contacto</label>
                  <input
                    type="text"
                    v-model="fornecedor.contacto"
                    id="contato"
                    class="form-control"
                    required
                  />
                </div>

                <div class="col-lg-6 col-md-6 mb-3">
                  <label for="contato" class="form-label">Localização</label>
                  <input
                    type="text"
                    v-model="fornecedor.localizacao"
                    id="contato"
                    class="form-control"
                    required
                  />
                </div>

                <div class="mt-3">
                  <br><br><br><br><br>
                  <button class="btn btn-primary" type="submit">
                    Adicionar
                  </button>
                </div>

              </div>
            </form>
            </div>
            
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import * as api  from '../../services/api';
import TheHeader from '../../navbar/TheHeader.vue';

export default {
  components: {
    TheHeader,
  },
  data() {
    return {
      fornecedor: {
        nome: '',
        nif: '',
        contacto: '',
        localizacao: '',
      },
    };
  },
  methods: {
    async adicionar() {
      await api.iniciarBaseDados();

      // Defina o objeto 'fornecedor'
      const fornecedor = {
        nome: this.fornecedor.nome,
        nif: this.fornecedor.nif,
        contacto: this.fornecedor.contacto,
        localizacao: this.fornecedor.localizacao,
      }

      // Tente clonar o objeto para garantir que ele seja serializável
      const fornecedorSerializado = JSON.parse(JSON.stringify(fornecedor));

      // Adiciona ao IndexedDB
      await api.adicionar(fornecedorSerializado, "Fornecedor");

      // Atualiza o estado do Vuex
      this.$store.state.fornecedores.push(fornecedor);

      // Redireciona para a página de usuários
      this.$router.push('/fornecedores');
    },

    voltar() {
      this.$router.back();
    }
  },
};
</script>

<style>
  button {
    background: #ff5722 !important;
    border: none !important;
  }
</style>