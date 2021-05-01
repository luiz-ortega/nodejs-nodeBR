const { get } = require("axios");

const URL = "http://swapi.dev/api/people";

async function obterPessoas(nome) {
  const url = `${URL}/?search=${nome}&format=json`;
  const response = await get(url);
  return response.data.results.map(mapearPessoas);
}

function mapearPessoas(item) {
  return {
    nome: item.name,
    peso: item.height,
  };
}

module.exports = {
  obterPessoas,
  URL,
};
