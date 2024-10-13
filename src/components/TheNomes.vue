<template>
<div id="content">
        <div class="pt-4 px-2 pe-lg-3">
            <div>
                <h4>Nomes</h4>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <div class="py-3">
                  <div class="mb-3">
                    <table>
                      <tr>
                        <td>Registados: </td>
                        <td class="ps-3"> {{ registados }}</td>
                      </tr>
                    </table>
                  </div>
              </div>
              <div class="py-3">
                  <input placeholder="busca por nome" type="" name="" class="me-2" v-model="search">
                  <button class="btn btn-sm verde" @click="pesquisar(search)">
                      buscar <span class="bi-search" style="color: #fff;"></span>
                  </button>
              </div>
            </div>
            
            <div class="table-responsive">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nome</th>
                      <th scope="col">Batizado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>..</td>
                      <td>
                        <div style="position: relative;">
                          <input type="" name="" class="form-control" v-model="nome">
                          <div class="position-absolute col-12">
                            <div class="p-2" v-if="nome" style="background: #dbdbdb;">
                              <p class="mb-1" v-for="item in filteredNomes">
                              {{ item.nome}}
                            </p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <select class="form-select" v-model="batizado">
                          <option value="" disabled="">
                            selecionar
                          </option>
                          <option value="sim" selected>
                            sim
                          </option>
                          <option value="não">
                            não
                          </option>
                        </select>
                      </td>
                      <td>
                        <div class="" v-if="edit">
                          <div>
                            <div class="btn verde col-12" @click="editar">
                             Editar
                              </div>
                            </div>
                          </div>

                        <div v-else class="">
                          <div>
                            <div class="btn verde col-12" @click="add()">
                             Adicionar
                              </div>
                            </div>
                          </div>
                      </td>
                    </tr>
                    <tr v-for="(item, id) in reversedFilteredItems">
                      <td> {{ id }} </td>
                      <td> {{ item.nome }} </td>
                      <td> 
                        {{ item.batizado }}
                      </td>
                      <td>
                        <div class="d-flex justify-content-end">
                        <ul class="acoes" style="width: 130px;">
                            <li>
                                <button class="btn btn-sm" style="background-color: grey;" @click="ver(item.id)">
                                <span class="bi bi-eye-fill">
                                    
                                </span>
                                </button>
                            </li>
                            <li>
                                <button class="btn btn-sm btn-info" @click="getData(item.id)" data-bs-toggle="modal" data-bs-target="#addMunicipios0">
                                <span class="bi bi-pencil-fill">
                                    
                                </span>
                                </button>
                            </li>
                            <li>
                                <button class="btn btn-sm btn-danger" @click="getEli(item.id)" data-bs-toggle="modal" data-bs-target="#eliMunicipios">
                                <span class="bi bi-trash-fill">
                                    
                                </span>
                                </button>
                            </li>
                        </ul>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Adicionar Provincias -->
<div class="modal fade" id="addMunicipios" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content" style="background: none !important; border: none !important;">
      <div class="modal-body">
        <div style="padding-top: 0px;">
      <div class="bg-white rounded-3">
        <div class="modal-header px-0 py-2 pt-3 mx-3">
          <h5 class="modal-title p-0" id="exampleModalLabel" v-if="edit">Editar Nome</h5>
	        <h5 v-else class="modal-title p-0" id="exampleModalLabel">Adicionar Nome</h5>
	        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	    </div>

        <div>
          <div style="height: 35vh; overflow: auto;">
          	<div class="pt-3 px-3">
          		<form>
          			<div class="mb-3">
                  <label for="provincia" class="form-label">Nome</label>
                  <input type="" name="" class="form-control" v-model="nome">
          			</div>
                <div>
                  <label for="provincia" class="form-label">Batizado</label>
                  <select class="form-select" v-model="batizado">
                    <option value="" disabled="">
                      selecionar
                    </option>
                    <option value="sim" selected>
                      sim
                    </option>
                    <option value="não">
                      não
                    </option>
                  </select>
                </div>
          		</form>
          	</div>
          </div>
        </div>

        <div class="pb-2 px-3" v-if="edit">
          <div class="pt-2">
            <div class="btn verde col-12 py-1" @click="editar" data-bs-dismiss="modal" aria-label="Close">
             Editar
              </div>
            </div>
          </div>

        <div v-else class="pb-2 px-3">
          <div class="pt-2">
            <div class="btn verde col-12 py-1" @click="add()" data-bs-dismiss="modal" aria-label="Close">
             Adicionar
              </div>
            </div>
          </div>


      </div>
    </div>
      </div>
    </div>
  </div>
</div>

    <!-- Editar Provincias -->

    <!-- Eliminar Provincias -->
<div class="modal fade" id="eliMunicipios" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Eliminar Município</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>
        	Confirme para <span style="color: red;">Eliminar</span>
        </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="excluir()">confirmar</button>
      </div>
    </div>
  </div>
</div>

</template>

<script type="text/javascript">
//import Dexie from 'dexie';
import { openDB } from 'idb';

export default {
	data() {
		return {
      nome: '',
      batizado: 'sim',
      db: null,
      edit: false,
      id: '',

      membros: [],
      novoRegistro: { nome: '', email: '' },
      dadosObtidos: [],

      search: '',
      registados: ''
		}
	},

	methods: {
    novo() {
      this.edit = false
      this.nome = ''
      this.batizado = 'sim'
    },


async initBanco() {
  const db = await openDB("MeuDB", 1, {
  upgrade(db) {
    const datas = db.createObjectStore("datas", {
      keyPath: "id",
      autoIncrement: true,
    });
    datas.createIndex("sabado", "sabado", { unique: false });
    datas.createIndex("data", "data", { unique: false });
    datas.createIndex("trimestre", "trimestre", { unique: false });

    const ticados = db.createObjectStore("ticados", {
      keyPath: "id",
      autoIncrement: true,
    });
    ticados.createIndex("id_membro", "id_membro", { unique: false });
    ticados.createIndex("nome", "nome", { unique: false });
    ticados.createIndex("situacao", "situacao", { unique: false });
    ticados.createIndex("data_id", "data_id", { unique: false });
    ticados.createIndex("trimestre", "trimestre", { unique: false });

    const membros = db.createObjectStore("membros", {
      keyPath: "id",
      autoIncrement: true,
    });
    membros.createIndex("nome", "nome", { unique: false });
    membros.createIndex("batizado", "batizado", { unique: false });
  },
});
},

async add() {
    
  if (true) {
    try {
      const db = await openDB("MeuDB", 1);
      const transactionTicados = db.transaction("membros", "readwrite");
      const store = transactionTicados.objectStore("membros");

      const data = { nome: this.nome, batizado: this.batizado}

      await store.add(data);

      //await transactionDatas.done;
      await transactionTicados.done;

      console.log("Dados inseridos com sucesso!");
    } catch (error) {
      console.error("Erro ao inserir dados:", error);
    }
  }

  this.nome = ''
  this.batizado = 'sim'
  this.carregarmembros()
},

async carregarmembros() {
    const db = await openDB("MeuDB", 1);
    const tx = db.transaction('membros', 'readonly');
    const store = tx.objectStore('membros');
    this.$store.state.membros = await store.getAll();

    this.registados = this.$store.state.membros.length
},

async cloneMembros() {
  const db = await openDB("MeuDB", 1);
    const tx = db.transaction('membros', 'readonly');
    const store = tx.objectStore('membros');
    this.$store.state.membros = await store.getAll();

    localStorage.setItem("membros", JSON.stringify(this.$store.state.membros))

    const dados = JSON.parse(localStorage.getItem("membros"))

    console.log(dados)
},

async getCloneMembros() {

  const dados = JSON.parse(localStorage.getItem("membros"))

  
  var id = 0

  const request = setInterval(async ()=> {  

    const db = await openDB("MeuDB", 1);
    const transaction = db.transaction("membros", "readwrite");
    const store = transaction.objectStore("membros");
    
    const data = { nome: dados[id].nome, batizado: dados[id].batizado}

    console.log(data)
    await store.add(data);

    await transaction.done;

    console.log(id)
    id++

    if (id > dados.length-1) {

      clearInterval(request)
      await this.carregarmembros();
      console.log("Finalizado")

      }

    }, 500)

},


async getData(id) {
    this.edit = true
    
    const db = await openDB("MeuDB", 1);
    const tx = db.transaction('membros', 'readonly');
    const store = tx.objectStore('membros');

    // Use o método get() para obter o registro com base no ID
    this.dadosObtidos = await store.get(id);

    this.nome = this.dadosObtidos.nome
    this.batizado = this.dadosObtidos.batizado

},

async editar() {
    if (this.dadosObtidos) {
        // Crie um novo objeto com os valores atualizados
        const novoRegistro = {
            ...this.dadosObtidos, // Copie todos os valores do registro original
            nome: this.nome,    // Altere para o novo nome desejado
            batizado: this.batizado// Adicione outros campos atualizados conforme necessário
        };

        const db = await openDB("MeuDB", 1);
        const transactionTicados = db.transaction("membros", "readwrite");
        const store = transactionTicados.objectStore("membros");

        // Use o método put() para atualizar o registro no IndexedDB
        await store.put(novoRegistro);

        this.edit = false
        this.nome = ''
        this.batizado = 'sim'

        // Carregue novamente os membros após a edição
        await this.carregarmembros();        
    }
},
  

getEli(id) {
  this.id = id;
},

async excluir() {
    const db = await openDB("MeuDB", 1);
    const transactionTicados = db.transaction("membros", "readwrite");
    const store = transactionTicados.objectStore("membros");

    // Use o método delete() para excluir o registro com base no ID
    await store.delete(this.id);

    // Carregue novamente os membros após a exclusão
    await this.carregarmembros();
},

},

created() {
  this.initBanco()

  console.log(this.$store.state.membros.length)

  this.carregarmembros() 
  //this.cloneMembros()

  setTimeout(() => {
    if (this.$store.state.membros.length == 0) {
      // this.getCloneMembros()
    }

  }, 2000)
  
},
 
 computed: {
    filteredItems() {
      try {
          return this.$store.state.membros.filter(item =>
            item.nome.toLowerCase().includes(this.search.toLowerCase())
          );
        } catch (error) {
          console.log("Ocorreu um erro ao listar")
        }
    }, 
    reversedFilteredItems() {
      if (this.$store.state.membros) {
        return this.filteredItems.slice().reverse(); // Copia o array filtrado e o inverte
      }
    },
    filteredNomes() {
      if (this.$store.state.membros) {
        return this.$store.state.membros.filter(item =>
          item.nome.toLowerCase().includes(this.nome.toLowerCase())
        );
      }
    },
  },
  
}
</script>

<style type="text/css">
	.acoes {
            padding: 0;
            margin: 0; 
        }

      .acoes li {
        list-style-type: none;
        display: inline;
        margin: 0 3px; 
      }

      .sidebar-li li, .sidebar-li li i, .sidebar-li li strong {
        color: #fff !important;
    }
</style>