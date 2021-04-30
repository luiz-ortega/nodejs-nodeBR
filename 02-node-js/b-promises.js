/*
    1. Obeter um usuário
    2. Obter o número de telefone de um usuário a partir do seu id
    3. Obter o endereço de um usuário pelo Id 
*/
const util = require("util");
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      return resolve({
        id: 1,
        name: "Aladin",
        dataNascimento: new Date(),
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      return resolve({
        telefone: "119999999",
        ddd: 11,
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario, callBack) {
  setTimeout(function () {
    return callBack(null, {
      rua: "rua dos bobos",
      numero: 0,
    });
  });
}

const usuarioPromise = obterUsuario();

usuarioPromise
  .then(function (usuario) {
    return obterTelefone(usuario.id).then(function resolverTelefone(result) {
      return {
        usuario: {
          name: usuario.name,
          id: usuario.id,
        },
        telefone: result,
      };
    });
  })
  .then(function (resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id);
    return endereco.then(function resolverEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result,
      };
    });
  })
  .then(function (resultado) {
    console.log(`
        None: ${resultado.usuario.name},
        Endereco: ${resultado.endereco.rua},${resultado.endereco.numero},
        Telefone: (${resultado.telefone.ddd})${resultado.telefone.telefone}
  `);
  })
  .catch(function (error) {
    console.log("error", error);
  });
