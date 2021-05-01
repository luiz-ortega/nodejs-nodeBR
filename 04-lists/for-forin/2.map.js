const service = require("./services");

async function main() {
  try {
    const results = await service.obterPessoas("a");
    const names = [];

    result.results.forEach(function (item) {
      names.push(item.name);
    });

    console.log("names", names);
  } catch (error) {
    console.log("error", error);
  }
}

main();
