<template>

<div ref="elementToSave">
<div id="sidebar" class="p-3 menu" style="background: none;">
        <div class="verde p-3 pt-4" style="background-color: rgba(0,0,0,0.7); height: 100%; border-radius: 20px; position: relative;">
          <ul class="sidebar-li mb-3 px-2">
            <li class="text-start" style="padding: 0; margin: 0;">
                  <div style="position: relative;">

                    <span id="expand-menu0">
                      <div class="text-center">
                        <div class="initials">
                          <img src="/logo.png" width="28" style="margin-top: -6px;">
                        </div> 
                        <div style="padding-top: 5px;">
                          <b style="color: #fff;">AGD</b>
                        </div>
                        <p style="font-size: 14px; color: #fff;">
                          Missão Sul - Lubango
                        </p>
                      </div>
                    </span>

                    <hr style="color: #fff; margin-bottom: 0;">
                    </div>
                </li>
          </ul>
          <div class="menu-scroll px-2">
            <ul class="sidebar-li">
                <div class="itens-menu">
                  <router-link to="/" class="router-link" hidden>
                  <li class="li-menu">
                      <span class="bi-list me-2"></span>
                      <span>Lista completa</span>
                  </li>
                  </router-link>

                  <!-- Localização -->
                  <div class="p-0">
                    <span style="font-size: 13px; color: #fff;">
                      - Dados gerais
                    </span>
                  </div>
                  <router-link to="/" class="router-link">
                    <li class="li-menu">
                        <span class="bi-list me-2"></span>
                        <span>Nomes</span>
                     </li>
                  </router-link>
                  <router-link to="/ticar" class="router-link">
                    <li class="li-menu">
                        <span class="bi-list me-2"></span> 
                        <span>Ticar</span>
                    </li>
                  </router-link>

                  <!-- Localização -->
                  <div class="p-0">
                    <span style="font-size: 13px; color: #fff;">
                      - Relatório
                    </span>
                  </div>
                  <router-link to="/ptrimestre" class="router-link">
                    <li class="li-menu">
                        <span class="bi-list me-2"></span>
                        <span>Por trimestre</span>
                     </li>
                  </router-link>
                  <router-link to="/pmembros" class="router-link">
                    <li class="li-menu">
                        <span class="bi-list me-2"></span> 
                        <span>Por membro</span>
                    </li>
                  </router-link>

                  <!-- Localização -->
                  <div class="p-0">
                    <span style="font-size: 13px; color: #fff;">
                      - Informações
                    </span>
                  </div>
                    <li class="li-menu" data-bs-toggle="modal" data-bs-target="#sobre">
                        <span class="bi-list me-2"></span>
                        <span>Sobre</span>
                     </li>
                    <li class="li-menu" data-bs-toggle="modal" data-bs-target="#contatos">
                        <span class="bi-list me-2"></span> 
                        <span>Contatos</span>
                    </li>
                </div>


            </ul>
            </div>

            <div style="position: absolute; bottom: 25px; left: 50%; transform: translate(-50%); opacity: 0.7;">
                <div class="text-center">
                <div>
                    <b style="color: #fff; font-size: 12px;">
                        Gestão de Doações
                    </b>
                </div>
                <div style="margin-top: -10px;">
                    <span style="color: #fff; font-style: italic; font-size: 10px;">
                        copyright 2024
                    </span>
                </div>
                </div>
            </div>
        </div>


    </div>
   <div id="topbar" class="topbar-mobile verde">
        <div id="logo" style="position: relative;" @click="toggleMenu">
            <div class="icon-menu">
                <div class="traco-menu"></div>
                <div class="traco-menu"></div>
                <div class="traco-menu"></div>
            </div>
        </div>
        <div id="username" hidden><a href="#">Nome de Usuário</a></div>
        <div id="username" class="invisible">
            Logo
        </div>
    </div>
</div>


<!-- Eliminar Provincias -->
<div class="modal fade" id="sobre" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Sobre</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div>
          <b>AGDI</b> é uma aplicação de gestão de doações da Igreja Adventista do Sétimo dia, que tem como objectivo facilitar o trabalho da comissão de mordomia.
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn verde" data-bs-dismiss="modal">Fechar</button>
      </div>
    </div>
  </div>
</div>


<!-- Eliminar Provincias -->
<div class="modal fade" id="contatos" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Contatos</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div>
        <i class="bi-geo-fill"></i> Huila-Lubango
        </div>
        <div class="py-1">
        <i class="bi-telephone-fill"></i> 939 371 075
        </div>
        <div>
          <i class="bi-globe2"></i> www.devaholic.ao
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn verde" data-bs-dismiss="modal">Fechar</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
   export default {
      data() {
       return {
         savedElementCode: ''
       };
      },

      methods: {
         toggleMenu() {
             document.querySelector('.menu').classList.toggle("showMenu")
         },

         saveElementCode() {
          // Obtém o conteúdo do elemento
          const elementCode = this.$refs.elementToSave.innerHTML;
          // Salva o código no localStorage
          localStorage.setItem('savedElementCode', elementCode);
          // Atualiza o estado da variável
          this.savedElementCode = elementCode;

          console.log("Pagina " + this.savedElementCode)
        },
      },

      mounted() {
          // this.saveElementCode()
          console.log("Menu")

        },

        created() {
          console.log("Menu")
        }

   }
</script>

<style type="text/css">
  #expand-menu .dropdown-content {
    padding-top: 40px;
    position: absolute;
    pointer-events: none; /* Para evitar interação quando invisível */
    top: 0px;
    right: -10px; /* Posicionado fora da tela inicialmente */
    z-index: 1;
    opacity: 0;
    transition: opacity 0.2s ease, transform 0.2s ease; /* Adicionando transições */
  }

  #expand-menu:hover .dropdown-content {
    opacity: 1;
    transform: translateX(-10px); /* Movendo para a esquerda para exibir */
    pointer-events: auto; /* Ativar interação quando visível */
  }

  .content-menu-drop {
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.7);
  }


  #expand-menu .initials {
    display: inline-block;
    height: 28px;
    width: 28px;
    color: #fff;
    padding-top: 2px;
    text-align: center;
    margin-right: 10px;
  }

  #expand-menu .dropdown-content p, .itens-menu .li-menu {
    margin: 8px 0;
    padding: 0 10px;
    cursor: pointer;
    border-radius: 10px;
    padding: 8px 0px;
    padding-left: 15px; 
  }

  #expand-menu .dropdown-content p:hover {
    background-color: #f0f0f0;
  }

  .itens-menu li span {
    color: #f0f0f0;
  }

  .itens-menu li:hover { 
    background-color: #f0f0f0;
  }

  .itens-menu li:hover span { 
    color: rgba(0,0,0,0.7) !important;
  }

  .router-link {
    text-decoration: none !important;
  }

  .menu-scroll {
    height: 80%; overflow-y: auto; overflow-x: hidden;
    scrollbar-width: thin; /* Define a largura do scroll */
    scrollbar-color: rgba(255, 255, 255, 0.2) transparent; /* Define a cor do scroll */
  }

  /* Estilizando a barra de rolagem */
.menu-scroll::-webkit-scrollbar {
    width: 8px; /* Largura do scroll no Chrome, Safari, etc. */
    height: 8px; /* Altura do scroll no Chrome, Safari, etc. */
}

/* Estilizando a alça do scroll */
.menu-scroll::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5); /* Cor da alça do scroll */
    border-radius: 4px; /* Define a borda arredondada */
}

/* Estilizando as bordas do scroll */
.menu-scroll::-webkit-scrollbar-track {
    background-color: transparent; /* Cor de fundo da barra de rolagem */
    border-radius: 8px; /* Define a borda arredondada */
}
</style>