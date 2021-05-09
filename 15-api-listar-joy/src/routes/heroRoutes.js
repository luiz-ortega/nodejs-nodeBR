const BaseRoute = require("./base/baseRoute");
const Joi = require("joi");

class HeroRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  list() {
    return {
      path: "/herois",
      method: "GET",
      options: {
        validate: {
          failAction: (request, headers, error) => {
            throw error;
          },
          query: Joi.object({
            skip: Joi.number().integer().default(0),
            limit: Joi.number().integer().default(10),
            nome: Joi.string().min(3).max(100).default(""),
          }),
        },
      },

      handler: (request, headers) => {
        try {
          const { skip, limit, nome } = request.query;

          const query = {
            nome: {
              $regex: `.*${nome}*.`,
            },
          };

          return this.db.read(nome ? query : {}, skip, limit);
        } catch (error) {
          console.log("Error", error);
          return "Erro interno no servidor";
        }
      },
    };
  }
}

module.exports = HeroRoutes;
