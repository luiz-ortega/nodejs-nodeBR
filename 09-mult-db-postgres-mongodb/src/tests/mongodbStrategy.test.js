const assert = require("assert");
const MongoDb = require("../db/strategies/mongodb");
const Context = require("../db/strategies/base/contextStrategy");

const context = new Context(new MongoDb());
describe("MongoDB Suite de testes", function () {
  this.beforeAll(async () => {
    await context.connect();
  });

  it("verificar conexao", async () => {
    const result = await context.isConnected();
    const expect = "Conectado";

    assert.deepEqual(result, expect);
  });
});
