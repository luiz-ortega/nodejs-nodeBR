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

function obterTelefone(idUsuario, callBack) {
  setTimeout(() => {
    return callBack(null, {
      telefone: "119999999",
      ddd: 11,
    });
  }, 2000);
}

function obterEndereco(idUsuario, callBack) {
  setTimeout(() => {
    return callBack(null, {
      rua: "rua dos bobos",
      numero: 0,
    });
  });
}

function resolverUsuario(erro, usuario) {
  console.log("usuario", usuario);
}

obterUsuario(function resolverUsuario(error, usuario) {
  if (error) {
    console.error("Deu ruim em USUARIO", error);
    return;
  }
  obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
    if (error) {
      console.error("Deu ruim em TELEFONE", error1);
      return;
    }
    obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
      if (error) {
        console.error("Deu ruim em ENDERECO", error2);
        return;
      }

      console.log(`
        None: ${usuario.name},
        Endereco: ${endereco.rua},${endereco.numero},
        Telefone: (${telefone.ddd})${telefone.telefone}
      `);
    });
  });
});
/* const telefone = obterTelefone(usuario.id);

console.log("telefone", telefone); */
