import store from '../store/index.js';
import axios from "axios"
import Swal from 'sweetalert2'
var data, token

if(localStorage.getItem('token')) {
  token = localStorage.getItem('token')

 //token = data.token
}
// let token = ""


//Msg
function sweetSucesso(msg) {
  Swal.fire({
    title: msg,
    text: "...",
    icon: 'success',
    timer: 2000, // tempo em milissegundos (3 segundos no exemplo)
    showConfirmButton: false, // remover o botão "OK"
  })
}

function sweetErro(errorResponse) {
  let msg = ""

  if (errorResponse) {
    // Verifique o código de status para identificar o tipo de erro
    if (errorResponse === 500) {
      msg = "Erro interno do servidor!"
      console.log(msg);
    } else if (errorResponse === 404) {
      msg = "Recurso não encontrado!"
      console.log(msg);
    } else if (errorResponse === 401) {
      msg = "Email ou Senha errada!"
      console.log(msg);
    }
     else {
      msg = "Erro HTTP!"
      console.log(msg);
    }
  }
  Swal.fire({
    title: 'Erro!',
    text: msg,
    icon: 'error',
    timer: 2000, // tempo em milissegundos (3 segundos no exemplo)
    showConfirmButton: false, // remover o botão "OK"
  })
}



/* var data, token
if(localStorage.getItem('Auth')) {
 data = JSON.parse(localStorage.getItem('Auth'))

 token = data.token
}
*/

// Api Config
export const api_login = axios.create({
  baseURL: "https://api-quero-salo.devaholic.ao/",
  // target: "https://api-regional-motors.casadosomangola.com/",
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Max-Age': '3600',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  
  }

})

// Api Config
export const api = axios.create({
  baseURL: "https://api-quero-salo.devaholic.ao/",
  // target: "https://api-regional-motors.casadosomangola.com/",
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Max-Age': '3600',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Access-Control-Allow-Credentials': 'true',
    // Defina o Content-Type como 'multipart/form-data' para upload de arquivos
    'Content-Type': 'application/json',
    // 'Content-Type': 'multipart/form-data',
    'Accept': 'application/json',
    // 'changeOrigin': 'true',
    // Se você estiver usando autenticação, adicione o cabeçalho de autorização aqui
    'Authorization': 'Bearer ' + token
  }

})

// Api Config
export const api_image = axios.create({
  baseURL: "https://api-quero-salo.devaholic.ao/",
  // target: "https://api-regional-motors.casadosomangola.com/",
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Max-Age': '3600',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
    'Authorization': 'Bearer ' + token

    // Se você estiver usando autenticação, adicione o cabeçalho de autorização aqui
    // 'Authorization': 'Bearer ' + token
  }

})

//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------

//Login 
// Fazer Login
export async function Login(data) {

  try {
    const response = await api_login.post('api/login', data);
    //sweetSucesso('Login com Sucesso!')

    return response.data

  } catch (error) {
    sweetErro(error.response.status)

  }

}


//Cadastro
// Cadastrar
export async function adicionarUser(data) {
  //console.log('token add: '+token)

  try {
    const response = await api.post('api/register', data);
    sweetSucesso('Feito')

    // criarAnunciante(dataAnunciante)

    return response.data;

  } catch (error) {
    sweetErro(error.response.status)

  }

}

//Listar User
export async function listarUser() {
  try {
    const response = await api.get('api/user/listar_user');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Opcional: propague o erro para que ele possa ser tratado em outro lugar, se necessário.
  }
}


////////////////////////////////////////
////////////////////////////////////////
//====================================//
//Provincias
export async function addProvincias(data) {
  //console.log('token add: '+token)

  try {
    const response = await api.post('api/registar_provincias', data);
    sweetSucesso('Feito')

    return response.data;

  } catch (error) {
    sweetErro(error.response.status)

  }

}

//Listar Provincias
export async function lsProvincias() {
  try {
    const response = await api.get('api/listar_provincias');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Opcional: propague o erro para que ele possa ser tratado em outro lugar, se necessário.
  }
}

//Detalhar Provincias
export async function detalharProvincias(id) {
  try {
    const response = await api.get('api/detalhar_provincias/'+id)
    return response.data;

  } catch (error) {

    throw error;
  }
}


//Editar Provincias
export async function editProvincias(data, id) {
  try {
    const response = await api.put('api/editar_provincias/'+id, data);

    sweetSucesso("Editado");

    return response;

  } catch (error) {
    sweetErro(error.response.status)
  }
}

//Eliminar Provincias
export async function eliProvincias(id) {
  try {
    const response = await api.get('api/eliminar_provincias/' + id);

    sweetSucesso("Removido")

    return response.data;
  } catch (error) {

    sweetErro(error.response.status)

    throw error;
  }
}


////////////////////////////////////////
////////////////////////////////////////
//====================================//

//Municipios
export async function addMunicipios(data) {
  try {
    const response = await api.post('api/registar_municipio', data);
    sweetSucesso('Feito')

    return response.data;

  } catch (error) {
    sweetErro(error.response.status)

  }

}

//Listar Municipios
export async function lsMunicipios() {
  try {
    const response = await api.get('api/listar_municipios');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Opcional: propague o erro para que ele possa ser tratado em outro lugar, se necessário.
  }
}

//Detalhar Municipio
export async function detalharMunicipios(id) {
  try {
    const response = await api.get('api/detalhar_municipio/'+id)
    return response.data;

  } catch (error) {

    throw error;
  }
}


//Editar Municipio
export async function editMunicipios(data, id) {
  try {
    const response = await api.put('api/editar_municipio/'+id, data);

    sweetSucesso("Editado");

    return response;

  } catch (error) {
    sweetErro(error.response.status)
  }
}

//Eliminar Municipio
export async function eliMunicipios(id) {
  try {
    const response = await api.get('api/eliminar_municipio/' + id);

    sweetSucesso("Removido")

    return response.data;
  } catch (error) {

    sweetErro(error.response.status)

    throw error;
  }
}


////////////////////////////////////////
////////////////////////////////////////
//====================================//

//Clientes
export async function addClientes(data) {
  try {
    const response = await api.post('api/registar_cliente', data);
    sweetSucesso('Feito')

    return response.data;

  } catch (error) {
    sweetErro(error.response.status)

  }

}

//Listar Clientes
export async function lsClientes() {
  try {
    const response = await api.get('api/listar_clientes');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Opcional: propague o erro para que ele possa ser tratado em outro lugar, se necessário.
  }
}

//Detalhar Clientes
export async function detalharClientes(id) {
  try {
    const response = await api.get('api/detalhar_cliente/'+id)
    return response.data;

  } catch (error) {

    throw error;
  }
}


//Editar Clientes
export async function editClientes(data, id) {
  try {
    const response = await api.put('api/editar_cliente/'+id, data);

    sweetSucesso("Editado");

    return response;

  } catch (error) {
    sweetErro(error.response.status)
  }
}

//Eliminar Clientes
export async function eliClientes(id) {
  try {
    const response = await api.get('api/eliminar_cliente/' + id);

    sweetSucesso("Removido")

    return response.data;
  } catch (error) {

    sweetErro(error.response.status)

    throw error;
  }
}


////////////////////////////////////////
////////////////////////////////////////
//====================================//

//Bairros
export async function addBairros(data) {
  try {
    const response = await api.post('api/registar_bairro', data);
    sweetSucesso('Feito')

    return response.data;

  } catch (error) {
    sweetErro(error.response.status)

  }

}

//Listar Bairros
export async function lsBairros() {
  try {
    const response = await api.get('api/listar_bairros');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Opcional: propague o erro para que ele possa ser tratado em outro lugar, se necessário.
  }
}

//Detalhar Bairros
export async function detalharBairros(id) {
  try {
    const response = await api.get('api/detalhar_bairro/'+id)
    return response.data;

  } catch (error) {

    throw error;
  }
}


//Editar Bairros
export async function editBairros(data, id) {
  try {
    const response = await api.put('api/editar_cliente/'+id, data);

    sweetSucesso("Editado");

    return response;

  } catch (error) {
    sweetErro(error.response.status)
  }
}

//Eliminar Bairros
export async function eliBairros(id) {
  try {
    const response = await api.get('api/eliminar_cliente/' + id);

    sweetSucesso("Removido")

    return response.data;
  } catch (error) {

    sweetErro(error.response.status)

    throw error;
  }
}


////////////////////////////////////////
////////////////////////////////////////
//====================================//

//Areas
export async function addAreas(data) {
  try {
    const response = await api.post('api/registar_area', data);
    sweetSucesso('Feito')

    return response.data;

  } catch (error) {
    sweetErro(error.response.status)

  }

}

//Listar Areas
export async function lsAreas() {
  try {
    const response = await api.get('api/listar_areas');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Opcional: propague o erro para que ele possa ser tratado em outro lugar, se necessário.
  }
}

//Detalhar Areas
export async function detalharAreas(id) {
  try {
    const response = await api.get('api/detalhar_area/'+id)
    return response.data;

  } catch (error) {

    throw error;
  }
}


//Editar Areas
export async function editAreas(data, id) {
  try {
    const response = await api.put('api/editar_area/'+id, data);

    sweetSucesso("Editado");

    return response;

  } catch (error) {
    sweetErro(error.response.status)
  }
}

//Eliminar Areas
export async function eliAreas(id) {
  try {
    const response = await api.get('api/eliminar_area/' + id);

    sweetSucesso("Removido")

    return response.data;
  } catch (error) {

    sweetErro(error.response.status)

    throw error;
  }
}


////////////////////////////////////////
////////////////////////////////////////
//====================================//

//Areas de Atuacao
export async function addAreas_atuacao(data) {
  try {
    const response = await api.post('api/registar_atuacao', data);
    sweetSucesso('Feito')

    return response.data;

  } catch (error) {
    sweetErro(error.response.status)

  }

}

//Listar Areas
export async function lsAreas_atuacao() {
  try {
    const response = await api.get('api/listar_atuacaos');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Opcional: propague o erro para que ele possa ser tratado em outro lugar, se necessário.
  }
}

//Detalhar Areas
export async function detalharAreas_atuacao(id) {
  try {
    const response = await api.get('api/detalhar_atuacao/'+id)
    return response.data;

  } catch (error) {

    throw error;
  }
}


//Editar Areas
export async function editAreas_atuacao(data, id) {
  try {
    const response = await api.put('api/editar_atuacao/'+id, data);

    sweetSucesso("Editado");

    return response;

  } catch (error) {
    sweetErro(error.response.status)
  }
}

//Eliminar Areas
export async function eliAreas_atuacao(id) {
  try {
    const response = await api.get('api/eliminar_atuacao/' + id);

    sweetSucesso("Removido")

    return response.data;
  } catch (error) {

    sweetErro(error.response.status)

    throw error;
  }
}


//Carregar fotos Anuncios
export async function carregarFotos(data, id) {
    console.log("Carregando foto...");
    console.log(data);

    try {
        const response = await api_image.post(`api/anuncios/uploadFoto1_anuncios/${id}`, data, {
            onUploadProgress: (progressEvent) => {
                const totalBytes = progressEvent.total;
                const bytesEnviados = progressEvent.loaded;
                const progress = (bytesEnviados / totalBytes) * 100;

                store.state.progressImg = progress.toFixed(2);
                console.log("carregando " + store.state.progressImg);
            },
        });

        sweetSucesso();
        store.state.progressImg = 0;

        console.log('Response');
        console.log(response.data);
        console.log("Terminado");

        return response.data;
    } catch (error) {
        sweetErro(error.response.status);
        throw error; // Rejeitar o erro para tratar na função handleFileChange
    }
}

//FILTROS
//Filtrar Anuncios
export async function filtrarAnuncio(url) {
  try {
    const response = await api.get(url)
    
    return response.data;

  } catch (error) {

    throw error;
  }
}


//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------


//Categoria
//Carregar fotos Categorias
export async function carregarFotosCategoria(data, id) {
    console.log("Carregando foto...");
    console.log(data);

    try {
        const response = await api_image.post(`api/anuncios/uploadFoto1_anuncios/${id}`, data, {
            onUploadProgress: (progressEvent) => {
                const totalBytes = progressEvent.total;
                const bytesEnviados = progressEvent.loaded;
                const progress = (bytesEnviados / totalBytes) * 100;

                store.state.progressImg = progress.toFixed(2);
                console.log("carregando " + store.state.progressImg);
            },
        });

        sweetSucesso();
        store.state.progressImg = 0;

        console.log('Response');
        console.log(response.data);
        console.log("Terminado");

        return response.data;
    } catch (error) {
        sweetErro(error.response.status);
        throw error; // Rejeitar o erro para tratar na função handleFileChange
    }
}

//Adicionar Categoria
export async function adicionarCategoria(data) {
  try {
    const response = await api.post('api/categorias/registar_categorias', data);
    sweetSucesso()

    return response.data;

  } catch (error) {
    sweetErro(error.response.status)

  }

}

// Listar Categoria
export async function listarCategoria() {
  try {
    const response = await api.get('api/categorias/listar_categorias');
    // const response = await api.get('api/anuncios/listar_anuncios?estado_id=36');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Opcional: propague o erro para que ele possa ser tratado em outro lugar, se necessário.
  }
}

// Editar Categoria
export async function editarCategoria(data, id) {
  try {
    const response = await api.put('api/editar_categorias/update/'+id, data);

    sweetSucesso("Actualizado");

    return response;

  } catch (error) {
    sweetErro(error.response.status)
  }
}

//Eliminar Categoria
export async function eliminarCategoria(id) {
  try {
    const response = await api.get('api/eliminar_categorias/' + id);

    sweetSucesso("Removido")

    return response.data;
  } catch (error) {

    sweetErro(error.response.status)

    throw error;
  }
}

//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//Detalhar eliminar Bairro
//Eliminar Municipio
//Cadastrar area