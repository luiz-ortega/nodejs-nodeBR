const BaseRoute = require("./base/baseRoute");
const Joi = require("joi");
const Boom = require("boom");

const failAction = (request, headers, error) => {
  throw error;
};

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
          failAction,
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
          return Boom.internal();
        }
      },
    };
  }

  create() {
    return {
      path: "/herois",
      method: "POST",
      options: {
        validate: {
          failAction,
          payload: Joi.object({
            nome: Joi.string().required().min(3).max(100),
            poder: Joi.string().required().min(2).max(100),
          }),
        },
      },
      handler: async (request) => {
        try {
          const { nome, poder } = request.payload;

          const result = await this.db.create({
            nome,
            poder,
          });

          return {
            message: "Heroi cadastrado com sucesso!",
            _id: result._id,
          };
        } catch (error) {
          console.log(error);
          return Boom.internal();
        }
      },
    };
  }

  update() {
    return {
      path: "/herois/{id}",
      method: "PATCH",
      options: {
        validate: {
          failAction,
          params: Joi.object({
            id: Joi.string().required(),
          }),
          payload: Joi.object({
            nome: Joi.string().min(3).max(100),
            poder: Joi.string().min(2).max(100),
          }),
        },
      },
      handler: async (request) => {
        try {
          const { id } = request.params;

          const { payload } = request;

          const dadosString = JSON.stringify(payload);
          const dados = JSON.parse(dadosString);

          const result = await this.db.update(id, dados);

          if (result.nModified !== 1)
            return Boom.preconditionFailed("Id não encontrado no banco!");

          return {
            message: "Heroi atualizado com sucesso!",
          };
        } catch (error) {
          console.log(error);
          return Boom.internal();
        }
      },
    };
  }

  delete() {
    return {
      path: "/herois/{id}",
      method: "DELETE",
      options: {
        validate: {
          failAction,
          params: Joi.object({
            id: Joi.string().required(),
          }),
        },
      },
      handler: async (request) => {
        try {
          const { id } = request.params;
          const result = await this.db.delete(id);

          if (result.nModified !== 1)
            return Boom.preconditionFailed("Id não encontrado no banco!");

          return {
            message: "Heroi removido com sucesso!",
          };
        } catch (error) {
          console.log("Error", error);
          return Boom.internal();
        }
      },
    };
  }
}

module.exports = HeroRoutes;
