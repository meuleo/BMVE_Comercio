// Iniciar indexeddb
var bd = null;

export function iniciarBaseDados() {
  return new Promise((resolve, reject) => {
    var request = indexedDB.open('bd-contato', 1);

    request.addEventListener("error", (event) => {
      mostrarErro(event);
      reject(event);
    });

    request.addEventListener("success", (event) => {
      bd = event.target.result;
      console.log("Banco de dados iniciado.");
      resolve(bd); // Resolve a promise quando a conexão é estabelecida
    });

    request.addEventListener("upgradeneeded", criarBanco);
  });
}

function mostrarErro(event) {
  alert("Temos um Erro - " + event.message);
}

function criarBanco(event) {
  bd = event.target.result;

  // Criação da tabela Contatos com autoIncrement
  var Contato = bd.createObjectStore("Contatos", { keyPath: "id", autoIncrement: true });
  Contato.createIndex("BuscarNome", "Nome", { unique: false });
  
  // Criação da tabela Imagens com autoIncrement
  var Imagens = bd.createObjectStore("Imagens", { keyPath: "id", autoIncrement: true });
  Imagens.createIndex("contatoId", "contatoId", { unique: false }); // Index para buscar imagens por ID de contato

  console.log("Banco e tabelas criados.");
}



// ##########################
// ###### Opereções #########
// ##########################

// Função para adicionar um registro
export function adicionar(data, tabela) {
  return new Promise((resolve, reject) => {
    var transaction = bd.transaction([tabela], "readwrite");
    var store = transaction.objectStore(tabela);
    var request = store.add(data); // Não é necessário definir o id no objeto data

    request.onsuccess = function() {
      console.log("Registro adicionado:", data);
      resolve(data); // Resolve a promise após adicionar o registro
    };

    request.onerror = function(event) {
      console.error("Erro ao adicionar Registro:", event.target.error);
      reject(event.target.error); // Rejeita a promise em caso de erro
    };
  });
}

// Função para listar registros de uma tabela
export function listar(tabela) {
  return new Promise((resolve, reject) => {
    var transaction = bd.transaction([tabela], "readonly");
    var store = transaction.objectStore(tabela);
    var request = store.getAll(); // Obtém todos os registros

    request.onsuccess = function(event) {
      resolve(event.target.result); // Retorna os registros
    };

    request.onerror = function(event) {
      console.error("Erro ao listar registros:", event.target.error);
      reject(event.target.error);
    };
  });
}

// Função para editar um registro
export function editar(data, tabela) {
  return new Promise((resolve, reject) => {
    var transaction = bd.transaction([tabela], "readwrite");
    var store = transaction.objectStore(tabela);
    var request = store.put(data); // Usa put para atualizar ou adicionar um registro

    request.onsuccess = function() {
      console.log("Registro editado:", data);
      resolve(data);
    };

    request.onerror = function(event) {
      console.error("Erro ao editar registro:", event.target.error);
      reject(event.target.error);
    };
  });
}

// Função para eliminar um registro
export function eliminar(id, tabela) {
  return new Promise((resolve, reject) => {
    var transaction = bd.transaction([tabela], "readwrite");
    var store = transaction.objectStore(tabela);
    var request = store.delete(id); // Deleta o registro pelo ID

    request.onsuccess = function() {
      console.log("Registro eliminado com ID:", id);
      resolve(id);
    };

    request.onerror = function(event) {
      console.error("Erro ao eliminar registro:", event.target.error);
      reject(event.target.error);
    };
  });
}

// Função para carregar imagens
export function carregarImagens(imagens, contatoId, tabela) {
  return new Promise((resolve, reject) => {
    var transaction = bd.transaction([tabela], "readwrite");
    var store = transaction.objectStore(tabela);

    // Adiciona cada imagem ao store
    imagens.forEach(imagem => {
      const data = {
        contatoId: contatoId,
        imagem: imagem // Aqui você pode armazenar a imagem como uma URL, Blob, ou o que preferir
      };

      var request = store.add(data);
      
      request.onsuccess = function() {
        console.log("Imagem adicionada:", data);
      };

      request.onerror = function(event) {
        console.error("Erro ao adicionar imagem:", event.target.error);
        reject(event.target.error);
      };
    });

    transaction.oncomplete = function() {
      resolve(); // Resolve a promise quando todas as imagens foram adicionadas
      console.log("Todas as imagens foram adicionadas.");
    };

    transaction.onerror = function(event) {
      console.error("Erro na transação:", event.target.error);
      reject(event.target.error);
    };
  });
}
