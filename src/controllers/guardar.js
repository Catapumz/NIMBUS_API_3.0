const validator = require("validator");
const Bloques_Vias = require("../models/Bloques_vias");
const Users = require("../models/user");
const moment = require("moment");
const { findByIdAndUpdate } = require("../models/user");

const crear = async (req, res) => {
  try {
    const parametros = req.body;
    const userId = req.user.id;
    parametros.edited_at = moment();
    parametros.created_at = moment();
    parametros.created_by = req.user.id;

    const user = await Users.findById(userId);
    const created_routes = user.created_routes;

    const articulo = new Bloques_Vias(parametros);

    const callback = async (error, articuloGuardado) => {
      if (error || !articuloGuardado) {
        console.debug("error");

        return res.status(400).json({
          status: "error",
          mensaje: "No se ha guardado el itinerario",
        });
      }

      const parametros = {};
      parametros.created_routes = created_routes;
      parametros.created_routes.push(articuloGuardado.id);

      const useractualizado = await Users.findByIdAndUpdate(userId, parametros);

      //Devolver resultado
      return res.status(200).json({
        itinerario: articuloGuardado,
        mensaje: "Itinerario creado con exito",
        useractualizado,
      });
    };

    articulo.save(callback);
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ha habido un error",
    });
  }
};

module.exports = { crear };
