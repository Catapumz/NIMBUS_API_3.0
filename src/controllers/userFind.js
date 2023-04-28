const Users = require("../models/user");

const consulta = async (req, res) => {
  //   let { buscar } = req.query;
  //   let { quepared } = req.query;

  const buscar = req.params.find;
  try {
    //{ "buscar": "aqui la busqueda"} asi es como se pasa
    let consulta = await Users.find({
      $or: [
        { nick: { $regex: buscar, $options: "i" } },
        { name: { $regex: buscar, $options: "i" } },
        { email: { $regex: buscar, $options: "i" } },
      ],
    }).exec((error, users) => {
      return res.status(200).json({
        status: "Éxito, aquí están los resultados de tu búsqueda",
        vias: users,
      });
    });
  } catch (error) {
    return res.status(400).json({
      status: "Ha ocurrido un error",
    });
  }
};

module.exports = { consulta };
