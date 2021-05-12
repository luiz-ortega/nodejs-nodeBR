const assert = require("assert");
const api = require("../api");

let app = {};

const MOCK_HEROI_CADASTRAR = {
  nome: "Chapolin colorado",
  poder: "Marreta bionica",
};

const MOCK_HEROI_INICIAL = {
  nome: "Gavião negro",
  poder: "A mira",
};

let MOCK_ID = "";

describe("Suite de testes da api Heroes", function () {
  this.beforeAll(async () => {
    app = await api;

    const result = await app.inject({
      method: "POST",
      url: "/herois",
      payload: JSON.stringify(MOCK_HEROI_INICIAL),
    });
    const dados = JSON.parse(result.payload);
    MOCK_ID = dados._id;
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
    const NAME = MOCK_HEROI_INICIAL.nome;
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

  it("atualizar PATCH - /herois/:id", async () => {
    const _id = MOCK_ID;

    const expected = {
      poder: "Super mira",
    };

    const result = await app.inject({
      method: "PATCH",
      url: `/herois/${_id}`,
      payload: JSON.stringify(expected),
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 200);
    assert.deepEqual(dados.message, "Heroi atualizado com sucesso!");
  });

  it("atualizar PATCH - /herois/:id - não deve atualizar com ID incorreto", async () => {
    const _id = "60933128ffc97b09db878a7a";

    const expected = {
      poder: "Super mira",
    };

    const result = await app.inject({
      method: "PATCH",
      url: `/herois/${_id}`,
      payload: JSON.stringify(expected),
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);
    const dadosExpected = {
      statusCode: 412,
      error: "Precondition Failed",
      message: "Id não encontrado no banco!",
    };

    assert.ok(statusCode === 412);
    assert.deepEqual(dados, dadosExpected);
  });

  it("remover DELETE - /herois/:id", async () => {
    const _id = MOCK_ID;

    const result = await app.inject({
      method: "DELETE",
      url: `/herois/${_id}`,
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);
    const dadosExpected = {
      statusCode: 412,
      error: "Precondition Failed",
      message: "Id não encontrado no banco!",
    };

    assert.ok(statusCode === 412);
    assert.deepEqual(dados, dadosExpected);
  });

  it("retornar erro ao remover DELETE - /herois/:id com id inexistente", async () => {
    const _id = "60933128ffc97b09db878a72";

    const result = await app.inject({
      method: "DELETE",
      url: `/herois/${_id}`,
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    const dadosExpected = {
      statusCode: 412,
      error: "Precondition Failed",
      message: "Id não encontrado no banco!",
    };

    assert.ok(statusCode === 412);
    assert.deepEqual(dados, dadosExpected);
  });

  it("retornar erro ao remover DELETE - /herois/:id com id inválido", async () => {
    const _id = "INVALIDID";

    const result = await app.inject({
      method: "DELETE",
      url: `/herois/${_id}`,
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    const dadosExpected = {
      error: "Internal Server Error",
      message: "An internal server error occurred",
      statusCode: 500,
    };

    assert.ok(statusCode === 500);
    assert.deepEqual(dados, dadosExpected);
  });
});
