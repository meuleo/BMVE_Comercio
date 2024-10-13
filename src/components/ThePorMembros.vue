<template>
<div id="content">
        <div class="pt-4 px-2 pe-lg-3">
            <div>
                <h5 v-if="anoSelecionado">Relatório por membro ano {{ anoSelecionado }} </h5>
                <h5 v-else class="invisible">Fidelidade por Doações | {{ anoSelecionado }} </h5>
            </div>
            <div class="py-3">
                <div style="display: flex; justify-content: space-between;">
              <div class="">
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
                  <input placeholder="busca por nome" type="" name="" class="me-2" v-model="search">
                  <button class="btn btn-sm verde" @click="pesquisar()">
                      buscar <span class="bi-search" style="color: #fff;"></span>
                  </button>
              </div>
            </div>
            </div>
            <div class="d-flex" style="justify-content: end;">
              <router-link to="/pmembros-pdf">
                <button class="btn btn-sm btn-danger" style="width: 40px;">
                    <span class="bi-file-earmark-pdf-fill" style="font-size: 18px;">      
                    </span>
                </button>
              </router-link>
            </div>
            <div class="table-responsive">
                <table class="table table-striped" v-for="(totalMembro, idMembro) in totalPorMembroFiltrado" :key="idMembro" v-if="resultados == 1">
                  <thead>
                    <tr class="verde">
                        <th colspan="6">
                         
                        </th>
                      </tr>
                    <tr class="header-table" style="background-color: #000; color: #fff;">
                      <th scope="col" colspan="6"> 
                        <div class="text-center">
                          {{ getNomeMembro(idMembro) }}
                        </div>
                      </th>
                    </tr>
                    <tr class="header-table">
                      <th scope="col">Trimestre</th>
                      <th scope="col">Dizimos</th>
                      <th scope="col">Ofertas</th>
                      <th scope="col">Dizimos e Ofertas</th>
                      <th scope="col">Total de Doações</th>
                      <th scope="col" class="text-center">...</th>
                    </tr>
                  </thead>
                  <tbody>

                        <tr v-for="(count, trimestre) in totalMembro" :key="trimestre" style="padding: 10px 0;">
                          <td>{{ trimestre }}º trimestre</td>
                          <td>{{ count.Dizimo ? count.Dizimo : 0 }}</td>
                          <td>{{ count.Oferta ? count.Oferta : 0 }}</td>
                          <td>{{ count['Dizimo e Oferta'] ? count['Dizimo e Oferta'] : 0 }}</td>
                          <td>{{ totalMembroTotal(trimestre, idMembro) }}</td>
                          <td>
                            <button class="btn btn-sm verde" data-bs-toggle="modal" data-bs-target="#verDetalhar" @click="verDetalhar(idMembro, trimestre, getNomeMembro(idMembro))">
                              <span class="bi-eye" style="color: #fff;"></span>
                            </button>
                          </td>
                        </tr>
                  </tbody>
                </table>

                <table class="table" v-else>
                <thead >
                    <tr class="header-table">
                      <th scope="col">Nome</th>
                      <th scope="col">Trimestre</th>
                      <th scope="col">Dizimos</th>
                      <th scope="col">Ofertas</th>
                      <th scope="col">Dizimos e Ofertas</th>
                      <th scope="col">Total de Doações</th>
                      <th scope="col" class="text-center" hidden>...</th>
                    </tr>
                    <tr>
                      <td colspan="6" v-if="resultados == 2">
                        <div>
                          <div class="p-4 text-center">
                        Não há registos de {{ anoSelecionado }}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </thead>
                </table>
            </div>

        </div>
    </div>

<!-- Eliminar Provincias -->
<div class="modal fade" id="verDetalhar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{ nomeDetalhe }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p class="mb-2">
          <b style="font-size: 18px; opacity: 0.7;">
            {{ trimestreDetalhe }}º trimestre
          </b>
        </p>
        <div>
          <table class="table table-striped">
            <thead>
            <tr>
              <td> Doação </td>
              <td> Data </td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in mesesDetalhes">
              <td>
                {{item.situacao}}
              </td>
              <td>
                {{ item.data_id }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">fechar</button>
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
      anos: [],
      anoSelecionado: "",

      sabado: '',
      data: '',
      search: '',

      nome: '',
      situacao: '',

      db: null,
      edit: false,
      id: '',

      membros: [],
      dadosObtidos: [],

      currentYear: new Date().getFullYear(),

      search: '',

      sabado: '',
      data: '',

      ticados: '',
      oferta: '',
      dizimo: '',
      dizimoOferta: '',

      resultados: '',

      situacoes: [
        { id_membro: 90, nome: "Mariza Hengombé", situacao: "Oferta", data_id: "2024-07-08", trimestre: "3", id: 11 },
        { id_membro: 90, nome: "Mariza Hengombé", situacao: "Oferta", data_id: "2024-07-08", trimestre: "2", id: 12 },
        { id_membro: 90, nome: "Mariza Hengombé", situacao: "Oferta", data_id: "2024-07-08", trimestre: "1", id: 13 },
        { id_membro: 89, nome: "José Pedro Alberto", situacao: "Oferta", data_id: "2024-07-08", trimestre: "3", id: 14 },
        { id_membro: 89, nome: "José Pedro Alberto", situacao: "Oferta", data_id: "2024-07-08", trimestre: "2", id: 15 },
        { id_membro: 89, nome: "José Pedro Alberto", situacao: "Oferta", data_id: "2024-07-08", trimestre: "1", id: 16 },
        // Adicione aqui os outros dados...
      ],

      totalSituacoes: [],
      mesesDetalhes:  '',
      nomeDetalhe: '',
      trimestreDetalhe: '',
    }
  },

  methods: {
    verDetalhar(id, trimestre, nome) {
      console.log("id " + id)
      console.log("nome " + nome)
      console.log("trimestre " + trimestre)

      this.nomeDetalhe = nome
      this.trimestreDetalhe = trimestre

      this.mesesDetalhes = this.$store.state.ticados.filter(dado => dado.trimestre == trimestre && dado.id_membro == id);

    },

    countAno() {
      for (var i = this.currentYear-4; i <= this.currentYear; i++) {
        this.anos.push(i)
      }
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
  localStorage.setItem('anoSelecionadoMembro', this.anoSelecionado);

  this.anoSelecionado = localStorage.getItem("anoSelecionadoMembro")

  // Percorre todos os registros da tabela
  const cursor = await store.openCursor();
  if (cursor) {

    do {
      const ticado = cursor.value;

      const results =  {trimestre: ticado.trimestre, id: ticado.id, nome: ticado.nome, situacao: ticado.situacao, id_membro: ticado.id_membro, data_id: ticado.data_id}

      const ano = new Date(ticado.data_id).getFullYear();

      console.log("Chamando3", ano)

      //await store.delete(this.id);
      if (ano == this.anoSelecionado) {
        this.$store.state.ticados.push(results)

        console.log(ano)
        console.log(this.anoSelecionado)
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

},


 created() {
    this.initBanco()    
    
    if (localStorage.getItem("anoSelecionadoMembro")) {
      this.anoSelecionado = localStorage.getItem("anoSelecionadoMembro")
      this.listarTicks()
      this.listarMembros()
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
    totalPorMembro() {
      const totalPorMembro = {};

      this.$store.state.ticados.forEach((situacao) => {
        if (!totalPorMembro[situacao.id_membro]) {
          totalPorMembro[situacao.id_membro] = {};
        }

        if (!totalPorMembro[situacao.id_membro][situacao.trimestre]) {
          totalPorMembro[situacao.id_membro][situacao.trimestre] = { Dizimo: 0, Oferta: 0, 'Dizimo e Oferta': 0 };
        }

        if (totalPorMembro[situacao.id_membro][situacao.trimestre][situacao.situacao]) {
          totalPorMembro[situacao.id_membro][situacao.trimestre][situacao.situacao]++;
        } else {
          totalPorMembro[situacao.id_membro][situacao.trimestre][situacao.situacao] = 1;
        }
      });

      return totalPorMembro;
    },
    totalPorMembroFiltrado() {
      const filtroLowerCase = this.search.toLowerCase();
      return Object.keys(this.totalPorMembro).filter(idMembro => this.getNomeMembro(idMembro).toLowerCase().includes(filtroLowerCase) ||
        Object.values(this.totalPorMembro[idMembro]).some(total => String(total.Dizimo).includes(filtroLowerCase)))
      .reduce((totalFiltrado, idMembro) => {
          totalFiltrado[idMembro] = this.totalPorMembro[idMembro];
          return totalFiltrado;
        }, {});
    },
    totalMembroTotal() {
      return (trimestre, idMembro) => {
        const total = Object.values(this.totalPorMembro[idMembro][trimestre]).reduce((acc, cur) => acc + cur, 0);
        return total;
      };
    },
    totalMembroGeral() {
      return (idMembro) => {
        let totalGeral = 0;
        Object.values(this.totalPorMembro[idMembro]).forEach((totalTrimestre) => {
          totalGeral += Object.values(totalTrimestre).reduce((acc, cur) => acc + cur, 0);
        });
        return totalGeral;
      };
    },
    getNomeMembro() {
      return (idMembro) => {
        const membro = this.$store.state.membros.find(membro => membro.id == idMembro);
        return membro ? membro.nome : '';
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

  .header-table th {
    opacity: 0.7;
  }

  .verde th {
    color: #fff;
  }
</style>

