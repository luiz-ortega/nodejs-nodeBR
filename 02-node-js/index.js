/*
    1. Obeter um usuário
    2. Obter o número de telefone de um usuário a partir do seu id
    3. Obter o endereço de um usuário pelo Id 
*/

function obterUsuario(callBack) {
  setTimeout(function () {
    return callBack(null, {
      id: 1,
      name: "Aladin",
      dataNascimento: new Date(),
    });
  }, 1000);
}

function obterTelefone(callBack) {
  setTimeout(() => {
    return callBack(null, {
      telefone: "119999999",
      ddd: 11,
    });
  }, 2000);
}

function obterEndereco(idUsuario) {}

function resolverUsuario(erro, usuario) {
  console.log("usuario", usuario);
}

obterUsuario(function resolverUsuario(error, usuario) {
  if (error) {
    console.error("Deu ruim em USUARIO", error);
    return;
  }
  obterTelefone(function resolverTelefone(error1, telefone) {
    if (error) {
      console.error("Deu ruim em TELEFONE", error);
      return;
    }
  });
});
// const telefone = obterTelefone(usuario.id);

// console.log("telefone", telefone);
