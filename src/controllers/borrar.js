const Bloques_vias = require("../models/Bloques_vias");

const borrar = async (req, res) => {
  let routeId = req.params.id;
  let userId = req.user.id;
  let role = req.user.role;
  console.log(req.user.id);
  try {
    const route = await Bloques_vias.findById(routeId);

    if (route.created_by == userId || role === "role_admin") {
      Bloques_vias.findByIdAndDelete(routeId, (error, articuloBorrado) => {
        return res.status(200).json({
          Mensaje: "Itinerario eliminado con éxito",
          articuloBorrado,
        });
      });
    } else {
      return res.status(400).json({
        mensaje: "No eres el creador de esta ruta",
      });
    }
  } catch (error) {
    return res.status(400).json({
      mensaje: "Algo no ha ido bien",
    });
  }
};

module.exports = { borrar };
