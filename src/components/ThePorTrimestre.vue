<template>
<div id="content">
        <div class="pt-4 px-2 pe-lg-3">
            <div v-if="anoSelecionado">
                <h5>Relatório por trimestre ano {{ anoSelecionado }} </h5>
            </div>
            <div v-else>
                <h5 class="invisible">Doações</h5>
            </div>
            <div class="">
                <div style="display: flex; justify-content: space-between;">
              <div class="pb-4 pt-2">
                <div>
                  <label class="form-label">
                    Selecione um Ano
                  </label>
                  <select class="form-select" v-model="anoSelecionado" @change="listarTicks">
                    <option value="" selected="">
                      Ano
                    </option>
                    <option v-for="item in anos" :value="item">
                      {{ item }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="py-3 px-2">
                  <button class="btn btn-sm verde d-none" @click="pesquisar(search)">
                      fechar detalhes 
                  </button>
              </div>
            </div>
            </div>
            <div class="table-responsive">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Trimestre</th>
                      <th scope="col">Dizimos</th>
                      <th scope="col">Ofertas</th>
                      <th scope="col">Dizimos e Ofertas</th>
                      <th scope="col">Total de Doações</th>
                      <th scope="col" class="text-center" hidden>...</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(count, trimestre) in contarSituacoesPorTrimestre" :key="trimestre" v-if="resultados == 1">
                      <td>.</td>
                      <td>{{ trimestre }}º trimestre</td>
                      <td>{{ count.Dizimo ? count.Dizimo : 0 }}</td>
                      <td>{{ count.Oferta ? count.Oferta : 0 }}</td>
                      <td>{{ count['Dizimo e Oferta'] ? count['Dizimo e Oferta'] : 0 }}</td>
                      <td>{{ totalTrimestre(trimestre) }}</td>
                      <td class="text-center" hidden>
                        <button class="btn btn-sm btn-primary">
                          detalhar
                        </button>
                      </td>
                    </tr>
                    <tr v-else-if="resultados == 2">
                      <td colspan="6">
                        <div>
                          <div class="p-4 text-center">
                        Não há registos de {{ anoSelecionado }}
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr v-else>
                      
                    </tr>
                  </tbody>
                </table>
            </div>

           <div v-if="resultados == 1">
            <div class="mt-2">
              <b>Todos os trimestres</b><br>
              Dízimos: {{ totalSituacoes.Dizimo ? totalSituacoes.Dizimo : 0 }}<br>
              Ofertas: {{ totalSituacoes.Oferta ? totalSituacoes.Oferta : 0 }}<br>
              Dízimos e Ofertas: {{ totalSituacoes['Dizimo e Oferta'] ? totalSituacoes['Dizimo e Oferta'] : 0 }}<br><br>
            </div>
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
          <div style="height: 20vh; overflow: auto;">
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
        <h5 class="modal-title" id="exampleModalLabel">Eliminar Tic</h5>
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
      <div class="modal-body">
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
      sabado: '',
      data: '',

      nome: '',
      situacao: '',

      db: null,
      edit: false,
      id: '',

      membros: [],
      dadosObtidos: [],

      search: '',

      sabado: '',
      data: '',

      ticados: '',
      oferta: '',
      dizimo: '',
      dizimoOferta: '',

      currentYear: new Date().getFullYear(),

      totalSituacoes: [],

      anos: [],

      anoSelecionado: "",

      resultados: "",
		}
	},

	methods: {

    countAno() {
      for (var i = this.currentYear-4; i <= this.currentYear; i++) {
        this.anos.push(i)
      }
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

getEli(id) {
  this.id = id;
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

async saveData() {
  if (this.sabado != '' && this.data != '') {}
  try {
    const db = await openDB("MeuDB", 1);

    // Inserir dados na tabela 'datas'
    const transactionDatas = db.transaction("datas", "readwrite");
    const datasStore = transactionDatas.objectStore("datas");
    
    const data = { 
                    sabado: this.sabado, 
                    data: this.data
                  }

    await datasStore.add(data);

    console.log("Dados inseridos com sucesso!");
  } catch (error) {
    console.error("Erro ao inserir dados:", error);
  }

    // Para guardar um valor no localStorage
  localStorage.setItem('currentData', this.data);

  // Para resgatar um valor do localStorage
  if (localStorage.getItem('currentData')) {
    this.currentData = localStorage.getItem('currentData');
  }


  this.sabado = '' 
  this.data =   ''

  this.listarDatas()
  this.listarMembros()
  this.exibirTicados()
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

async listarTicks() {
  const db = await openDB("MeuDB", 1);
  const transaction = db.transaction(["ticados"], "readwrite");
  const store = transaction.objectStore("ticados");

  this.$store.state.ticados = []

  // Para guardar um valor no localStorage
  localStorage.setItem('anoSelecionado', this.anoSelecionado);

  this.anoSelecionado = localStorage.getItem("anoSelecionado")

  // Percorre todos os registros da tabela
  const cursor = await store.openCursor();
  if (cursor) {
    do {
      const ticado = cursor.value;

      const results =  {trimestre: ticado.trimestre, id: ticado.id, nome: ticado.nome, situacao: ticado.situacao}

      const ano = new Date(ticado.data_id).getFullYear();

      //await store.delete(this.id);
      if (ano == this.anoSelecionado) {
        this.$store.state.ticados.push(results)
      }

      

    } while (await cursor.continue());
  } else {
    console.log("Nenhum registro encontrado na tabela ticados.");
  }

  if (this.$store.state.ticados.length == 0) {
    this.resultados = 2
  } else {
    this.resultados = 1
  }
},

abrirTicados(event) {
   // Para guardar um valor no localStorage
   const data = event.target.textContent;

   console.log("Nova data: " + data)

  localStorage.setItem('currentData', data);

  // Para resgatar um valor do localStorage
  if (localStorage.getItem('currentData')) {
    this.currentData = localStorage.getItem('currentData');
  }

  this.exibirTicados()
},

},


 created() {
    this.initBanco()    
    
    //this.listarTicks()
    if (localStorage.getItem("anoSelecionado")) {
      this.anoSelecionado = localStorage.getItem("anoSelecionado")
      this.listarTicks()
    }
    this.countAno()
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
      return this.$store.state.membros.sort((a, b) => {
        if (a.nome < b.nome) return -1;
        if (a.nome > b.nome) return 1;
        return 0;
      });
    },
    contarSituacoesPorTrimestre() {
      const contador = {};
      const totalSituacoes = { Dizimo: 0, Oferta: 0, 'Dizimo e Oferta': 0 };

      this.$store.state.ticados.forEach((situacao) => {
        if (!contador[situacao.trimestre]) {
          contador[situacao.trimestre] = { Dizimo: 0, Oferta: 0, 'Dizimo e Oferta': 0 };
        }
        
        if (contador[situacao.trimestre][situacao.situacao]) {
          contador[situacao.trimestre][situacao.situacao]++;
        } else {
          contador[situacao.trimestre][situacao.situacao] = 1;
        }

        totalSituacoes[situacao.situacao]++;
      });

      this.totalSituacoes = totalSituacoes;

      return contador;
    },
    totalGeral() {
      return Object.values(this.totalSituacoes).reduce((acc, cur) => acc + cur, 0);
    },
    totalTrimestre() {
      return (trimestre) => {
        const total = Object.values(this.contarSituacoesPorTrimestre[trimestre]).reduce((acc, cur) => acc + cur, 0);
        return total;
      };
    }
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
