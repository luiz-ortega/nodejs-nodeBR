const assert = require("assert");
const api = require("../api");

let app = {};
describe("Suite de testes da api Heroes", function () {
  this.timeout(Infinity);
  this.beforeAll(async () => {
    app = await api;
  });

  it("Listar /herois", async () => {
    const result = await app.inject({
      method: "GET",
      url: "/herois?skip=0&limit=10",
    });

    const dados = JSON.parse(result.payload);

    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(Array.isArray(dados));
  });

  it("listar /herois - deve retornar somente 3 registros", async () => {
    const TAMANHO_LIMITE = 3;
    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`,
    });

    const dados = JSON.parse(result.payload);

    const statusCode = result.statusCode;
    assert.deepEqual(statusCode, 200);
    assert.ok(dados.length === TAMANHO_LIMITE);
  });

  it("retornar erro se limit ou skip forem de formatos inválidos", async () => {
    const TAMANHO_LIMITE = "aslfhjalf";
    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`,
    });

    assert.deepEqual(result.payload, "Erro interno no servidor");
  });

  it("filtrar um item", async () => {
    const NAME = "Homem Aranha-1620431011162";
    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=1000&nome=${NAME}`,
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;
    assert.deepEqual(statusCode, 200);
    assert.deepEqual(dados[0].nome, NAME);
  });
});
