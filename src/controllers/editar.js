const Bloques_vias = require("../models/Bloques_vias");
const Bloques_Vias = require("../models/Bloques_vias");
const moment = require("moment");

const editar = async (req, res) => {
  let routeId = req.params.id;
  let userId = req.user.id;
  let roleUser = req.user.role;

  let parametros = req.body;
  parametros.edited_at = moment();
  try {
    const route = await Bloques_vias.findById(routeId);

    if (route.created_by == userId || roleUser === "role_admin") {
      Bloques_Vias.findByIdAndUpdate(
        routeId,
        parametros,
        { new: true },
        (error, itinerarioActualizado) => {
          return res.status(200).json({
            itinerario: itinerarioActualizado,
            mensaje: "Itinerario actualizado con exito",
          });
        }
      );
    } else {
      return res.status(400).json({
        mensaje: "No eres el creador de esta ruta",
      });
    }
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ha habido un error",
    });
  }
};

module.exports = { editar };
