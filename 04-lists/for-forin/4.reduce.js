const { obterPessoas } = require("./services");

Array.prototype.meuReduce = function (callback, valorInicial) {
  const valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0];
  for (let index = 0; index <= this.length - 1; index++) {
    valorFinal = callback(valorFinal, this[index], this);
  }
  return valorFinal;
};

async function main() {
  try {
    const results = await obterPessoas("a");

    const pesos = results.results.map((item) => parseInt(item.height));

    // const total = pesos.reduce((anterior, proximo) => {
    //   return anterior + proximo;
    // }, 0);

    const minhaLista = [
      ["Erick", "Wendel"],
      ["NodeBR", "Nerdzão"],
    ];
    const total = minhaLista
      .reduce((anterior, proximo) => {
        return anterior.concat(proximo);
      }, [])
      .join(", ");

    // const customTotal = minhaLista.reduce(
    //   (acc, current) => `${acc},${current}`
    // );
    // console.log(customTotal);
    console.log(total);
  } catch (error) {
    console.log("error", error);
  }
}

main();
