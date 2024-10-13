<template>
<div id="content">
        <div class="pt-4 px-2 pe-lg-3">
            <div v-show="currentData">
                <h5>Ticar | {{ currentData }} <span style="cursor: pointer; font-size: 13px; color: red; opacity: 0.4;" @click="fecharFolha">fechar</span></h5>
            </div>
            <div class="py-3">
                <div style="display: flex; justify-content: space-between;">
              <div class="py-3">
                  <button class="btn btn-sm verde" data-bs-toggle="modal" data-bs-target="#addMunicipios" @click="menuTicsFun(3)">
                      Novo Tick <span class="bi bi-plus" style="color: #fff;"></span>
                  </button>
              </div>
              <div class="py-3">
                  <input placeholder="busca por nome" type="" name="" class="me-2" v-model="search">
                  <button class="btn btn-sm verde" @click="pesquisar(search)">
                      buscar <span class="bi-search" style="color: #fff;"></span>
                  </button>
              </div>
            </div>
            </div>
            <div class="mb-2">
              <table>
                <tr>
                  <td>Dizimos</td>
                  <td class="ps-3"> {{ dizimo }}</td>
                </tr>
                <tr>
                  <td>Ofertas</td>
                  <td class="ps-3"> {{ oferta }}</td>
                </tr>
                <tr>
                  <td>Dizimos e Ofertas</td>
                  <td class="ps-3"> {{ dizimoOferta }}</td>
                </tr>
                <tr>
                  <td>Total de doadores</td>
                  <td class="ps-3">{{ ticados }}</td>
                </tr>
              </table>
            </div>
            <div class="table-responsive">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nome</th>
                      <th scope="col">Ticar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div style="padding: 10px 5px;">
                         .. 
                        </div>
                      </td>

                      <td>
                        <div style="position: relative; padding: 10px 5px;">
                          <input type="" name="" class="form-control" v-model="nome" @keyup="autocompleteUp">
                          <div class="position-absolute col-12" style="z-index: 999;">
                            <div class="p-1 px-2" v-if="autoComplete" style="background: #dbdbdb; height: 250px; overflow: auto;">
                              <p class="mb-1" v-for="item in filteredNomes" @click="getNome(item.id, item.nome)">
                               
                               {{ item.nome}}
                            
                            </p>
                            <br>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style="padding: 10px 5px;">
                          <select class="form-select" v-model="situacao">
                            <option value="" disabled selected>
                              Nenhum
                            </option>
                            <option value="Dizimo">
                              Dizimo
                            </option>
                            <option value="Oferta">
                              Oferta
                            </option>
                            <option value="Dizimo e Oferta">
                              Dizimo e Oferta
                            </option>
                          </select>
                        </div>
                      </td>
                      <td>
                        <div style="padding: 10px 5px;">
                          <button class="btn col-12 btn-primary" @click="saveTicados">
                            Ticar
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr v-for="(item, id) in reversedFilteredItems">
                      <td> {{ id }} </td>
                      <td> {{ item.nome }} </td>
                      <td> {{ item.situacao }}</td>
                      <td>
                        <ul class="acoes text-end">
                            <li>
                                <button class="btn btn-sm" style="background-color: grey;" @click="ver(item.id)">
                                <span class="bi bi-eye-fill">
                                    
                                </span>
                                </button>
                            </li>
                            <li>
                                <button class="btn btn-sm btn-info" @click="getData(item.id)" data-bs-toggle="modal" data-bs-target="#addMunicipios">
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
          <div class="col-1">
            
          </div>
          <div class="col-10 text-center">
            <div v-show="menuTics">
              Selecione uma opção
            </div>
            <div v-show="criarTics">
              Criar novo Tic
            </div>
            <div v-show="abrirTics">
              Abrir existente
            </div>
          </div>
          <div class="col-1 text-end">
	        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
	    </div>

      <div class="perguntar" v-show='menuTics'>
        <div>
          <div>
          	<div class="pt-3 px-3">
          		<div >
                <div>
                  <button class="btn btn-primary col-12 mb-3" @click="menuTicsFun(1)">
                    Criar
                  </button>
                </div>  
                <div class="">
                  <button class="btn btn-dark col-12" @click="menuTicsFun(2)">
                    Abrir
                  </button>
                </div>  
              </div>
              <br>
          	</div>
          </div>
        </div>
      </div>


      <!-- Criar Tic -->
      <div class="Criar" v-show="criarTics">
        <div>
          <div>
            <div class="pt-3 px-3">
              <div>
                <div class="mb-3">
                  <label>
                    Trimestre
                  </label class="form-label">
                  <select class="form-select" v-model="trimestre">
                    <option disabled>
                      selecionar
                    </option>
                    <option value="1">
                      1° Trimestre
                    </option>
                    <option value="2">
                      2° Trimestre
                    </option>
                    <option value="3">
                      3° Trimestre
                    </option>
                    <option value="4">
                      4° Trimestre
                    </option>
                    <option value="5">
                      5° Sábado
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label>
                    Sábado
                  </label class="form-label">
                  <select class="form-select" v-model="sabado">
                    <option disabled>
                      selecionar
                    </option>
                    <option value="1">
                      1° Sábado
                    </option>
                    <option value="2">
                      2° Sábado
                    </option>
                    <option value="3">
                      3° Sábado
                    </option>
                    <option value="4">
                      4° Sábado
                    </option>
                    <option value="5">
                      5° Sábado
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label>
                    Data
                  </label class="form-label">
                  <input type="date" name="" class="form-control" v-model="data">
                </div>
              </div>

            </div>
          </div>
        </div>

        <div  class="pb-2 px-3">
          <div class="pt-2">
            <div class="btn verde col-12 py-1" @click="saveData" data-bs-dismiss="modal" aria-label="Close">
             Criar
              </div>
            </div>
          </div>
      </div>


      <!-- Abrir Tic -->
      <div class="Criar" v-show="abrirTics">
        <div>
          <div style="height: 65vh; overflow: auto;">
            <div class="pt-3 px-3 table-responsive">
              <div class="">
                <table class="table table-striped">
                  <tr>
                    <td>Trimestre</td>
                    <td>Sabado</td>
                    <td class="text-center py-2">
                      Data
                    </td>
                    <td class="text-center">...</td>
                  </tr>
                  <tr v-for="item in listaOrdenada" style="cursor: pointer;" @click="abrirTicados(item.data, item.trimestre)" data-bs-dismiss="modal" aria-label="Close">
                    <td>
                      {{ item.trimestre }}
                    </td>
                    <td>
                      {{item.sabado}}
                    </td>
                    <td class="text-center">
                      <div>
                        {{item.data}}
                      </div>
                    </td>
                    <td class="text-center">
                      <button class="btn" @click="getEliData(item.id, item.data)" data-bs-toggle="modal" data-bs-target="#eliData"
                      style="color: red;">
                          Eliminar
                      </button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>          
        </div>

        <div  class="pb-2 px-3" hidden>
          <div class="pt-2">
            <div class="btn verde col-12 py-1" @click="add" data-bs-dismiss="modal" aria-label="Close">
             Abrir
              </div>
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
        <h5 class="modal-title" id="exampleModalLabel">Eliminar Tick</h5>
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

<!-- Eliminar Provincias -->
<div class="modal fade" id="eliData" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Eliminar Data</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-center">
        <div class="mb-3" style="font-size: 18px; font-weight: bold; opacity: 0.7;">
          <span class="bi-exclamation-triangle" style="color: orange;"></span> Atenção
        </div>  Isto eliminará também todos os ticks desta data
        <p>
          Confirme para <span style="color: red;">Eliminar</span>
        </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="deletarAllTicados()">confirmar</button>
      </div>
    </div>
  </div>
</div>

</template>

<script type="text/javascript">
import { openDB } from 'idb';

export default {
	data() {
		return {
      menuTics: true,
      abrirTics: false,
      criarTics: false,

      sabado: '',
      data: '',

      nome: '',
      situacao: '',

      db: null,
      edit: false,
      id: '',
      eliData: '',

      membros: [],
      dadosObtidos: [],

      search: '',

      sabado: '',
      data: '',
      trimestre: '',

      currentData: '',
      currentTrimestre: '',
      ticados: '',
      oferta: '',
      dizimo: '',
      dizimoOferta: '',
      autoComplete: '',
      id_membro: ''
		}
	},

	methods: {
    menuTicsFun(opcao) {
      this.menuTics = false

      if (opcao == 1) {
        this.criarTics = true 
        this.abrirTics = false

      } else if (opcao == 2) {
        this.criarTics = false
        this.abrirTics = true

      } else if (opcao == 3) {
        this.menuTics = true
        this.criarTics = false
        this.abrirTics = false
      }


    },

   async add() {
    console.log("Adicionando")

    const tx = this.db.transaction('membros', 'readwrite');
    const store = tx.objectStore('membros');

    // Adicionando um único membro
    const novoMembro = { nome: this.nome, batizado: this.batizado };

    await store.add(novoMembro);

    // Atualizando a lista de membros após adicionar um novo
    await this.carregarmembros();
},

async carregarDatas() {
    const tx = this.db.transaction('datas', 'readonly');
    const store = tx.objectStore('datas');
    this.$store.state.datas = await store.getAll();
},


async getData(id) {
    this.edit = true

    const tx = this.db.transaction('membros', 'readonly');
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

        const tx = this.db.transaction('membros', 'readwrite');
        const store = tx.objectStore('membros');

        // Use o método put() para atualizar o registro no IndexedDB
        await store.put(novoRegistro);

        // Carregue novamente os membros após a edição
        await this.carregarmembros();        
    }
},
  

getEli(id) {
  this.id = id;
},

getEliData(id, eliData) {
  this.id = id;
  this.eliData = eliData
},

async excluir() {
  const db = await openDB("MeuDB", 1);
  const transaction = db.transaction(["ticados"], "readwrite");
  const store = transaction.objectStore("ticados");

    await store.delete(this.id);

    // Carregue novamente os membros após a exclusão
    await this.exibirTicados();
},

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

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

async saveData() {
  if (this.sabado != '' && this.data != '' && this.trimestre != '') {}
  try {
    const db = await openDB("MeuDB", 1);

    // Inserir dados na tabela 'datas'
    const transactionDatas = db.transaction("datas", "readwrite");
    const datasStore = transactionDatas.objectStore("datas");
    
    const data = { 
                    sabado: this.sabado, 
                    data: this.data,
                    trimestre: this.trimestre
                  }

    await datasStore.add(data);

    console.log("Dados inseridos com sucesso!");
  } catch (error) {
    console.error("Erro ao inserir dados:", error);
  }

    // Para guardar um valor no localStorage
  localStorage.setItem('currentData', this.data);
  localStorage.setItem('currentTrimestre', this.trimestre)

  // Para resgatar um valor do localStorage
  if (localStorage.getItem('currentData')) {
    this.currentData = localStorage.getItem('currentData');
    this.currentTrimestre = localStorage.getItem('currentTrimestre');
  }

  console.log(this.currentTrimestre)


  this.sabado = '' 
  this.data =   ''

  this.listarDatas()
  this.listarMembros()
  this.exibirTicados()
},

async saveTicados() {
  console.log(this.nome + " " + this.situacao)

  if (this.nome != '' && this.situacao != '') {
    if (this.currentTrimestre != '') {
      if (this.id_membro != '') {
        try {
          const db = await openDB("MeuDB", 1);
          const transactionTicados = db.transaction("ticados", "readwrite");
          const store = transactionTicados.objectStore("ticados");

          const data = { id_membro: this.id_membro, nome: this.nome, situacao: this.situacao, data_id: this.currentData, trimestre: this.currentTrimestre}

          await store.add(data);

          //await transactionDatas.done;
          await transactionTicados.done;

          this.nome = ''
          this.situacao = ''
          this.id_membro = ''
          this.autoComplete = ''
          
          this.exibirTicados()

          console.log("Dados inseridos com sucesso!");
        } catch (error) {
          console.error("Erro ao inserir dados:", error);
        }

    } else {
      alert("Você precisa clicar em um nome antes de Ticar")
    }

    } else {
      alert("Clica em novo para abrir ou criar uma data")
    }

  } else {
    alert("Preencha todos os campos")
  }

},

async listarDatas() {
    const db = await openDB("MeuDB", 1);
    const tx = db.transaction('datas', 'readonly');
    const store = tx.objectStore('datas');
    this.$store.state.datas = await store.getAll();
},

async listarMembros() {
    const db = await openDB("MeuDB", 1);
    const tx = db.transaction('membros', 'readonly');
    const store = tx.objectStore('membros');
    this.$store.state.membros = await store.getAll();
},

async listarTicados() {
    const db = await openDB("MeuDB", 1);
    const tx = db.transaction('ticados', 'readonly');
    const store = tx.objectStore('ticados');
    this.$store.state.ticados = await store.getAll();
},

async excluirData() {  const db = await openDB("MeuDB", 1);
  const transaction = db.transaction(["datas"], "readwrite");
  const store = transaction.objectStore("datas");

    // Use o método delete() para excluir o registro com base no ID
    await store.delete(this.id);

    //Retirar Data do local Storage
    localStorage.removeItem('currentData');
    localStorage.removeItem('currentTrimestre');

    this.currentTrimestre = ''
    this.currentData = ''

    // Carregue novamente os membros após a exclusão
    // await this.carregarmembros();
},

async exibirTicados() {
  const db = await openDB("MeuDB", 1);
  const transaction = db.transaction(["ticados"], "readwrite");
  const store = transaction.objectStore("ticados");

  this.$store.state.ticados = []
  this.dizimo = '0'
  this.oferta = '0'
  this.dizimoOferta = '0'
  this.ticados = '0'

  // Percorre todos os registros da tabela
  const cursor = await store.openCursor();
  if (cursor) {
    do {
      const ticado = cursor.value;

      //console.log(`ID: ${ticado.id} - Valor: ${ticado.nome}`);

      const results =  {id: ticado.id, nome: ticado.nome, situacao: ticado.situacao}

      //await store.delete(this.id);
      if (ticado.data_id == this.currentData) {
        this.$store.state.ticados.push(results)
        this.ticados++

        if(ticado.situacao == 'Oferta') {
         this.oferta++ 
        }
        if(ticado.situacao == 'Dizimo') {
         this.dizimo++ 
        }
        if(ticado.situacao == 'Dizimo e Oferta') {
         this.dizimoOferta++ 
        }
      }

      

    } while (await cursor.continue());
  } else {
    console.log("Nenhum registro encontrado na tabela ticados.");
  }
},

abrirTicados(dataTic, trimestre) {
   // Para guardar um valor no localStorage
   const data = dataTic

   console.log("Nova data: " + data)

  localStorage.setItem('currentData', data);
  localStorage.setItem('currentTrimestre', trimestre);

  // Para resgatar um valor do localStorage
  if (localStorage.getItem('currentData')) {
    this.currentData = localStorage.getItem('currentData');
    this.currentTrimestre = localStorage.getItem('currentTrimestre');
  }

  console.log(this.currentTrimestre)

  this.exibirTicados()
},

async deletarAllTicados() {
  const db = await openDB("MeuDB", 1);
  const transaction = db.transaction(["ticados"], "readwrite");
  const store = transaction.objectStore("ticados");

  // Percorre todos os registros da tabela
  const cursor = await store.openCursor();
  if (cursor) {
    do {
      const ticado = cursor.value;

      //console.log(`ID: ${ticado.id} - Valor: ${ticado.nome}`);

      //await store.delete(this.id);
      if (ticado.data_id == this.eliData) {
        await store.delete(ticado.id);
        console.log("Eliminando")
      }

    } while (await cursor.continue());
  } else {
    console.log("Nenhum registro encontrado na tabela ticados.");
  }

  this.excluirData(this.id)
  this.listarDatas()
  this.exibirTicados()
},

getNome(id_membro, nome) {
  this.nome = nome
  this.autoComplete = ''
  this.id_membro = id_membro  

  console.log("membro " + this.id_membro)

},

autocompleteUp() {
  this.autoComplete = this.nome
},

fecharFolha() {
  localStorage.removeItem('currentData');
  localStorage.removeItem('currentTrimestre');

  this.currentTrimestre = ''
  this.currentData = ''
  this.exibirTicados()
}

},



 created() {
    //this.initBanco()    
    //this.inserirDados()
    //this.excluirDados(1)

    //this.listarTidados()
    this.listarDatas()
    this.exibirTicados()

    // Para resgatar um valor do localStorage
    if (localStorage.getItem('currentData')) {
      this.currentData = localStorage.getItem('currentData');
      this.currentTrimestre = localStorage.getItem('currentTrimestre');
      this.listarMembros()
    }

    console.log(this.currentTrimestre)
  },

   computed: {
    filteredItems() {
      return this.$store.state.ticados.filter(item =>
        item.nome.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    reversedFilteredItems() {
      return this.filteredItems.slice().reverse(); // Copia o array filtrado e o inverte
    },
    listaOrdenada() {
      return this.$store.state.datas.sort((a, b) => {
        if (a.data < b.data) return -1;
        if (a.data > b.data) return 1;
        return 0;
      });
    },
    filteredNomes() {
      const removeAcentos = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      };

      const autoCompleteLowerCase = removeAcentos(this.autoComplete.toLowerCase());

      return this.$store.state.membros.filter(item => {
        const nomeLowerCase = removeAcentos(item.nome.toLowerCase());
        return nomeLowerCase.includes(autoCompleteLowerCase);
      });
    },

  }
  
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
  .datas {
    color: #fff;
  }

  .datas:hover {
    color: orange;
  }
</style>