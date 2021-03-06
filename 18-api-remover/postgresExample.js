// npm install sequelizemnpm i pg-hstore pg

const Sequelize = require("sequelize");
const driver = new Sequelize("HEROES", "username", "secretpassword", {
  host: "localhost",
  dialect: "postgres",
  quoteIdentifiers: false,
  operatorsAliases: false,
});

async function main() {
  const Herois = driver.define(
    "herois",
    {
      id: {
        type: Sequelize.INTEGER,
        required: true,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: Sequelize.STRING,
        required: true,
      },
      poder: {
        type: Sequelize.STRING,
        require: true,
      },
    },
    {
      tableName: "TB_HEROIS",
      freezeTableName: false,
      timestamps: false,
    }
  );
  await Herois.sync();
  await Herois.create({
    nome: "Lanterna verde",
    poder: "Anel",
  });
  const result = await Herois.findAll({
    raw: true,
    attributes: ["nome"],
  });

  console.log("result", result);
}

main();
