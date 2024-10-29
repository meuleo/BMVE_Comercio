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
              Produtos
            </span>
          </h5>
        </div>
      <!--  Row 1 -->
        <div class="col-lg-12 d-flex align-items-stretch">
          <div class="card w-100" style="background: rgba(255,255,255,0.96);">
              <div class="p-4">
                <div class="row">
                    <div class="col-6 mb-3">
                        <router-link to="/funcionarios/adicionar" class="btn btn-primary btn-sm">
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
            <div class="card-body p-4">
              <div class="table-responsive" v-if="$store.state.funcionarios.length > 0" style="height: 50vh; overflow: auto;">
                <table class="table text-nowrap mb-0 align-middle">
                      <thead class="text-dark fs-4">
                        <tr>
                          <th class="border-bottom-0">
                            <h6 class="fw-semibold mb-0">Id</h6>
                          </th>
                          <th class="border-bottom-0">
                            <h6 class="fw-semibold mb-0">Nome</h6>
                          </th>
                          <th class="border-bottom-0">
                            <h6 class="fw-semibold mb-0">Quantidade unitária</h6>
                          </th>
                          <th class="border-bottom-0">
                            <h6 class="fw-semibold mb-0">Preço unitário</h6>
                          </th>
                          <th class="border-bottom-0">
                            <h6 class="fw-semibold mb-0">Descrição</h6>
                          </th>
                          <th class="border-bottom-0">
                            <h6 class="fw-semibold mb-0">Data fabricação</h6>
                          </th>
                          <th class="border-bottom-0">
                            <h6 class="fw-semibold mb-0">Data caducidade</h6>
                          </th>
                          <th class="border-bottom-0">
                            <h6 class="fw-semibold mb-0">Fornecedor</h6>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="border-bottom-0"><h6 class="fw-semibold mb-0">1</h6></td>
                          <td class="border-bottom-0">
                              <h6 class="fw-semibold mb-1">Sunil Joshi</h6>
                              <span class="fw-normal">Web Designer</span>                          
                          </td>
                          <td class="border-bottom-0">
                            <p class="mb-0 fw-normal">Elite Admin</p>
                          </td>
                          <td class="border-bottom-0">
                            <div class="d-flex align-items-center gap-2">
                              <span class="badge bg-primary rounded-3 fw-semibold">Low</span>
                            </div>
                          </td>
                          <td class="border-bottom-0">
                            <h6 class="fw-semibold mb-0 fs-4">$3.9</h6>
                          </td>
                        </tr> 
                        <tr>
                          <td class="border-bottom-0"><h6 class="fw-semibold mb-0">2</h6></td>
                          <td class="border-bottom-0">
                              <h6 class="fw-semibold mb-1">Andrew McDownland</h6>
                              <span class="fw-normal">Project Manager</span>                          
                          </td>
                          <td class="border-bottom-0">
                            <p class="mb-0 fw-normal">Real Homes WP Theme</p>
                          </td>
                          <td class="border-bottom-0">
                            <div class="d-flex align-items-center gap-2">
                              <span class="badge bg-secondary rounded-3 fw-semibold">Medium</span>
                            </div>
                          </td>
                          <td class="border-bottom-0">
                            <h6 class="fw-semibold mb-0 fs-4">$24.5k</h6>
                          </td>
                        </tr> 
                        <tr>
                          <td class="border-bottom-0"><h6 class="fw-semibold mb-0">3</h6></td>
                          <td class="border-bottom-0">
                              <h6 class="fw-semibold mb-1">Christopher Jamil</h6>
                              <span class="fw-normal">Project Manager</span>                          
                          </td>
                          <td class="border-bottom-0">
                            <p class="mb-0 fw-normal">MedicalPro WP Theme</p>
                          </td>
                          <td class="border-bottom-0">
                            <div class="d-flex align-items-center gap-2">
                              <span class="badge bg-danger rounded-3 fw-semibold">High</span>
                            </div>
                          </td>
                          <td class="border-bottom-0">
                            <h6 class="fw-semibold mb-0 fs-4">$12.8k</h6>
                          </td>
                        </tr>      
                        <tr>
                          <td class="border-bottom-0"><h6 class="fw-semibold mb-0">4</h6></td>
                          <td class="border-bottom-0">
                              <h6 class="fw-semibold mb-1">Nirav Joshi</h6>
                              <span class="fw-normal">Frontend Engineer</span>                          
                          </td>
                          <td class="border-bottom-0">
                            <p class="mb-0 fw-normal">Hosting Press HTML</p>
                          </td>
                          <td class="border-bottom-0">
                            <div class="d-flex align-items-center gap-2">
                              <span class="badge bg-success rounded-3 fw-semibold">Critical</span>
                            </div>
                          </td>
                          <td class="border-bottom-0">
                            <h6 class="fw-semibold mb-0 fs-4">$2.4k</h6>
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
      this.$store.state.funcionarios.splice(index, index);
    }

  },

  async created() {
    // this.$store.state.funcionarios = dadosCarregados();
    await api.iniciarBaseDados();

    this.$store.state.funcionarios = await api.listar("Funcionario")

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