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

main();
async function main() {
  try {
    console.time("medida-promise");
    const usuario = await obterUsuario();
    const telefone = await obterTelefone(usuario.id);
    const endereco = await obterEnderecoAsync(usuario.id);
    /*  const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id),
    ]);
    const telefone = resultado[0];
    const endereco = resultado[1]; */
    console.log(`
      usuario: ${usuario.name},
      telefone: ${telefone.ddd},${telefone.telefone}
      endereco: ${endereco.rua},${endereco.numero},
    `);

    console.timeEnd("medida-promise");
  } catch (error) {
    console.log(error);
  }
}
