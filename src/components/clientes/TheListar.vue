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
              Clientes
            </span>
          </h5>
        </div>
      <!--  Row 1 -->
        <div class="col-lg-12 d-flex align-items-stretch">
          <div class="card w-100" style="background: rgba(255,255,255,0.96);">
              <div class="p-4">
                <div class="row">
                    <div class="col-6 mb-3">
                        <router-link to="/clientes/adicionar" class="btn btn-primary btn-sm">
                            Novo +
                        </router-link>
                    </div>
                    <div class="col-6" style="display: flex; justify-content: end;">
                        <div class="col-lg-6">
                            <span class="me-3">Filtro</span>
                            <input style="width: 75%; display: inline-block;" type="search" class="form-control" placeholder="Buscar">
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body p-4" style="height: 58vh; overflow: auto; ">
              <div class="table-responsive" v-if="$store.state.clientes.length > 0">
                <table class="table text-nowrap mb-0 align-middle">
                  <thead class="text-dark fs-4">
                    <tr>
                      <th class="border-bottom-0">
                        <h6 class="fw-semibold mb-0">Nome</h6>
                      </th>
                      <th class="border-bottom-0">
                        <h6 class="fw-semibold mb-0">Contacto</h6>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in $store.state.clientes.slice().reverse()" :key="item.id">
                      <td class="border-bottom-0">
                        <h6 class="fw-semibold mb-1">
                          {{ item.nome }}
                        </h6>
                        <!-- <span class="fw-normal">{{ item.genero || 'N/A' }}</span> -->
                      </td>
                      <td class="border-bottom-0">
                        <h6 class="fw-semibold mb-1">{{ item.contacto || 'N/A' }}</h6>
                      </td>
                      <td class="border-bottom-0 text-center">
                        <span class="fw-normal btn btn-sm">Detalhar</span>
                        <span class="fw-normal mx-1 btn btn-sm">
                          <router-link :to="`/clientes/editar/${item.id}`">
                            Editar
                          </router-link>
                        </span>
                        <span class="fw-normal btn btn-sm" @click="eliminar(index, item.id)">Eliminar</span>
                      </td>
                    </tr>                       
                  </tbody>
                </table>
              </div>
              <div v-else class="p-5 text-center">
                Sem registos
              </div>
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
    TheHeader
  },

  methods: {
    eliminar(index, id) {
      // Exibir o prompt de confirmação
      const confirmacao = confirm('Deseja realmente eliminar este funcionário?');

      api.eliminar(id, "Funcionario")
      this.$store.state.clientes.splice(index, index);
    }

  },

  async created() {
    // this.$store.state.clientes = dadosCarregados();
    await api.iniciarBaseDados();

    this.$store.state.clientes = await api.listar("Cliente")

  }
}
</script>

<style>
html {
    scrollbar-width: none; /* Firefox */
}

body::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
}

</style>