const { obterPessoas } = require("./services");

Array.prototype.meuFilter = function (callback) {
  const lista = [];
  for (index in this) {
    const item = this[index];
    const result = callback(item, index, this);
    if (!result) continue;
    lista.push(item);
  }
  return lista;
};

async function main() {
  try {
    const results = await obterPessoas("a");

    // const familiaLars = results.results.filter(function (item) {
    //   const result = item.name.toLowerCase().indexOf(`lars`) !== -1;
    //   return result;
    // });
    // const names = familiaLars.map((pessoa) => pessoa.name);
    // console.log(names);

    const familiaLars = results.results.meuFilter(
      (item, index, lista) => item.name.toLowerCase().indexOf("lars") !== -1
    );
    const names = familiaLars.map((pessoa) => pessoa.name);
    console.log(names);
  } catch (error) {
    console.log("error", error);
  }
}

main();
