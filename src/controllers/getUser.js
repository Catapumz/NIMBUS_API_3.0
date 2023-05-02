const users = require("../models/user");
const bloques_vias = require("../models/Bloques_vias");

const consulta = async (req, res) => {
  const userId = req.user.id;
  const result = await users.findById(userId);
  const user = [];

  const subuser = {
    id: result.id,
    name: result.name,
    user_role: result.role,
    nick: result.nick,
    email: result.email,
    created_routes: result.created_routes,
  };
  user.push(subuser);

  const created_routes = await bloques_vias.find({
    created_by: result.id,
  });

  return res.status(200).json({
    user: user,
    created_routes: created_routes,
  });
};

module.exports = { consulta };
