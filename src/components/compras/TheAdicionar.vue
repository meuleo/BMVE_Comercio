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
              Compras/adicionar
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
                  <label for="categoria" class="form-label">Fornecedor</label>
                  <select
                    v-model="compra.fornecedor_id"
                    id="categoria"
                    class="form-select"
                    required
                  >
                    <option value="">Selecionar</option>
                    <option value="Nossa Loga LDA">Nossa Loga LDA</option>
                    <option value="Junior & Filhos LDA">Junior & Filhos LDA</option>
                  </select>
                </div>

                <div class="col-lg-6 col-md-6 mb-3">
                  <label for="produto" class="form-label">Produto</label>
                  <input
                    type="text"
                    v-model="compra.produto"
                    id="produto"
                    class="form-control"
                    required
                  />
                </div>

                <div class="col-lg-6 col-md-6 mb-3">
                  <label for="contato" class="form-label">Quantidade</label>
                  <input
                    type="text"
                    v-model="compra.bi"
                    id="contato"
                    class="form-control"
                    required
                  />
                </div>


                <div class="col-lg-6 col-md-6 mb-3">
                  <label for="contato" class="form-label">Preço</label>
                  <input
                    type="text"
                    v-model="compra.preco"
                    id="contato"
                    class="form-control"
                    required
                  />
                </div>

                <div class="col-lg-6 col-md-6 mb-3">
                  <label for="contato" class="form-label">Data fabrico</label>
                  <input
                    type="text"
                    v-model="compra.data_fabrico"
                    id="contato"
                    class="form-control"
                    required
                  />
                </div>

                <div class="col-lg-6 col-md-6 mb-3">
                  <label for="contato" class="form-label">Data caducidade</label>
                  <input
                    type="text"
                    v-model="compra.data_caducidade"
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
    compra: {
        fornecedor_id: '',
        produto: '',
        quantidade: '',
        descricao: '',
        data_fabrico: '',
        data_caducidade: '',
        preco: ''
      },
    };
  },
  methods: {
    async adicionar() {
      await api.iniciarBaseDados();

      // Defina o objeto 'compra'
      const compra = {
        fornecedor_id: this.fornecedor_id,
        produto: this.produto,
        quantidade: this.quantidade,
        descricao: this.descricao,
        data_fabrico: this.data_fabrico,
        data_caducidade: this.data_caducidade,
        preco: this.preco
      }

      // Tente clonar o objeto para garantir que ele seja serializável
      const compraSerializado = JSON.parse(JSON.stringify(compra));

      // Adiciona ao IndexedDB
      await api.adicionar(compraSerializado, "compra");

      // Atualiza o estado do Vuex
      this.$store.state.compras.push(compra);

      // Redireciona para a página de usuários
      this.$router.push('/compras');
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