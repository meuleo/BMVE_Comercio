<template>
  <div class="body-wrapper">
    <TheHeader />
    <div class="container-fluid">
      <p style="font-size: 14px;" class="btn mb-3 p-0" @click="voltar">< voltar</p>
      <div class="mb-4">
        <h5>Funcionários/Adicionar</h5>
      </div>

      <div class="col-lg-12 d-flex align-items-stretch">
        <div class="card w-100">
          <div class="card-body p-4">
            <form @submit.prevent="adicionarUsuario">
              <div class="row">
                <div class="col-lg-6 col-md-6 mb-3">
                  <label for="nome" class="form-label">Nome</label>
                  <input
                    type="text"
                    v-model="usuario.nome"
                    id="nome"
                    class="form-control"
                  />
                </div>

                <div class="col-lg-6 col-md-6 mb-3">
                  <label for="genero" class="form-label">Gênero</label>
                  <input
                    type="text"
                    v-model="usuario.genero"
                    id="genero"
                    class="form-control"
                  />
                </div>

                <div class="col-lg-6 col-md-6 mb-3">
                  <label for="contato" class="form-label">Contacto</label>
                  <input
                    type="text"
                    v-model="usuario.contato"
                    id="contato"
                    class="form-control"
                  />
                </div>

                <div class="col-lg-6 col-md-6 mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    v-model="usuario.email"
                    id="email"
                    class="form-control"
                  />
                </div>

                <div class="col-lg-6 col-md-6 mb-3">
                  <label for="senha" class="form-label">Senha</label>
                  <input
                    type="password"
                    v-model="usuario.senha"
                    id="senha"
                    class="form-control"
                  />
                </div>

                <div class="col-lg-6 col-md-6 mb-3">
                  <label for="endereco" class="form-label">Endereço</label>
                  <input
                    type="text"
                    v-model="usuario.endereco"
                    id="endereco"
                    class="form-control"
                  />
                </div>

                <div class="col-lg-6 col-md-6 mb-3">
                  <label for="categoria" class="form-label">Categoria</label>
                  <select
                    v-model="usuario.categoria"
                    id="categoria"
                    class="form-select"
                  >
                    <option value="">Selecionar</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Atendente">Atendente</option>
                  </select>
                </div>

                <div class="col-lg-6 col-md-6 mb-3">
                  <label for="funcao" class="form-label">Função</label>
                  <select
                    v-model="usuario.funcao"
                    id="funcao"
                    class="form-select"
                  >
                    <option value="">Selecionar</option>
                    <option value="Administrador">Direitor</option>
                    <option value="Administrador">Gestor</option>
                    <option value="Vendedor">Vendedor</option>
                  </select>
                </div>

                <div class="mt-3">
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
import TheHeader from '../../navbar/TheHeader.vue';

export default {
  components: {
    TheHeader,
  },
  data() {
    return {
      usuario: {
        nome: '',
        contato: '',
        endereco: '',
        genero: '',
        categoria: '',
        funcao: '',
        email: '',
        senha: '',
      },
    };
  },
  methods: {
    async adicionarUsuario() {
      // Adiciona o registro ao Vuex
      this.$store.state.usuarios.push(this.usuario)

      // Redireciona para a página de usuários
      this.$router.push('/funcionarios');
    },

    voltar() {
      this.$router.back();
    }
  },
};
</script>
