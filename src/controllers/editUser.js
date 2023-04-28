const users = require("../models/user");

const editar = async (req, res) => {
  let userIdToEdit = req.params.id;
  let userIdsession = req.user.id;
  let roleUser = req.user.role;
  let parametros = req.body;

  try {
    const route = await users.findById(userIdToEdit);

    if (userIdToEdit == userIdsession || roleUser === "role_admin") {
      users.findByIdAndUpdate(
        userIdToEdit,
        parametros,
        { new: true },
        (error, usuarioActualizado) => {
          return res.status(200).json({
            itinerario: usuarioActualizado,
            mensaje: "Usuario actualizado con exito",
          });
        }
      );
    } else {
      return res.status(400).json({
        mensaje: "No puedes actualizar este usuario",
      });
    }
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ha habido un error",
    });
  }
};

module.exports = { editar };
