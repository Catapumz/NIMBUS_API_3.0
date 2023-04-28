const User = require("../models/user");

const borrar = async (req, res) => {
  let userId = req.params.id;
  let user_role = req.user.role;
  console.log(req.user.id);
  try {
    const route = await User.findById(userId);

    if (user_role === "role_admin") {
      User.findByIdAndDelete(userId, (error, userBorrado) => {
        if (error || !userBorrado) {
          return res.status(400).json({
            mensaje: "No se ha encontrado el usuario",
          });
        }

        return res.status(200).json({
          Mensaje: "Usuario eliminado con éxito",
          userBorrado,
        });
      });
    } else {
      return res.status(400).json({
        mensaje: "No tienes permisos de administrador",
      });
    }
  } catch (error) {
    return res.status(400).json({
      mensaje: "ha habido un error",
    });
  }
};

module.exports = { borrar };
