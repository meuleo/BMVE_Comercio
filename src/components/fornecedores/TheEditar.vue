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
              Fornecedores/Editar
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
              <form @submit.prevent="editarUsuario">
              <div class="row">
                <div class="col-lg-6 col-md-6 mb-3">
                  <label for="nome" class="form-label">Nome</label>
                  <input
                    type="text"
                    v-model="funcionario.nome"
                    id="nome"
                    class="form-control"
                    required
                  />
                </div>

                <div class="col-lg-6 col-md-6 mb-3">
                  <label for="contato" class="form-label">B.I</label>
                  <input
                    type="text"
                    v-model="funcionario.bi"
                    id="contato"
                    class="form-control"
                    required
                  />
                </div>

                <div class="col-lg-6 col-md-6 mb-3">
                  <label for="senha" class="form-label">Senha</label>
                  <input
                    type="password"
                    v-model="funcionario.senha"
                    id="senha"
                    class="form-control"
                    required
                  />
                </div>

                <div class="col-lg-6 col-md-6 mb-3">
                  <label for="categoria" class="form-label">Acesso</label>
                  <select
                    v-model="funcionario.acesso"
                    id="categoria"
                    class="form-select"
                    required
                  >
                    <option value="">Selecionar</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Vendedor">Vendedor</option>
                  </select>
                </div>

                <div class="mt-3">
                  <br><br><br><br><br>
                  <button class="btn btn-primary" type="submit">
                    Editar
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
      funcionario: {
        nome: '',
        bi: '',
        acesso: '',
        senha: '',
      },
    };
  },
  methods: {
    async editarUsuario() {
      // Adiciona o registro ao Vuex
      await api.iniciarBaseDados();

      // Defina o objeto 'funcionario'
      const funcionario = {
        id: Number(this.$route.params.id),
        nome: this.funcionario.nome,
        bi: this.funcionario.bi,
        acesso: this.funcionario.acesso,
        senha: this.funcionario.senha,
      }

      // Tente clonar o objeto para garantir que ele seja serializável
      const funcionarioSerializado = JSON.parse(JSON.stringify(funcionario));

      // Adiciona ao IndexedDB
      await api.editar(funcionarioSerializado, "Funcionario");

      // Atualiza o estado do Vuex
      this.$store.state.funcionarios.push(funcionarioSerializado);

      // Redireciona para a página de usuários
      this.$router.push('/funcionarios');
    },

    voltar() {
      this.$router.back();
    }
  },

  async created() {
    await api.iniciarBaseDados();

    this.funcionario = await api.buscarRegistoId(Number(this.$route.params.id), "Funcionario")
  }
};
</script>

<style>
  button {
    background: #ff5722 !important;
    border: none !important;
  }
</style>