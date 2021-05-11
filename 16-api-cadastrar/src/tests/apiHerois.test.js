const assert = require("assert");
const api = require("../api");

let app = {};
const MOCK_HEROI_CADASTRAR = {
  nome: "Chapolin colorado",
  poder: "Marreta bionica",
};

describe("Suite de testes da api Heroes", function () {
  this.beforeAll(async () => {
    app = await api;
  });

  it("Listar GET - /herois", async () => {
    const result = await app.inject({
      method: "GET",
      url: "/herois?skip=0&limit=10",
    });

    const dados = JSON.parse(result.payload);

    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(Array.isArray(dados));
  });

  it("listar GET - /herois - deve retornar somente 3 registros", async () => {
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

  it("GET - retornar erro se limit ou skip forem de formatos inválidos", async () => {
    const TAMANHO_LIMITE = "aslfhjalf";
    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`,
    });
    const errorResult = {
      statusCode: 400,
      error: "Bad Request",
      message: `\"limit\" must be a number`,
      validation: {
        source: "query",
        keys: ["limit"],
      },
    };

    assert.deepEqual(result.statusCode, 400);
    assert.deepEqual(result.payload, JSON.stringify(errorResult));
  });

  it("filtrar GET um item", async () => {
    const NAME = "Clone-100";
    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=1000&nome=${NAME}`,
    });
    const dados = JSON.parse(result.payload);

    const statusCode = result.statusCode;
    assert.deepEqual(statusCode, 200);
    assert.deepEqual(dados[0].nome, NAME);
  });

  it("cadastrar POST - /herois", async () => {
    const result = await app.inject({
      method: "POST",
      url: `/herois`,
      payload: JSON.stringify(MOCK_HEROI_CADASTRAR),
    });

    const statusCode = result.statusCode;
    const { message, _id } = JSON.parse(result.payload);
    assert.ok(statusCode === 200);
    assert.notStrictEqual(_id, undefined);
    assert.deepEqual(message, "Heroi cadastrado com sucesso!");
  });
});
