const user = require("../models/user");

const consulta = async (req, res) => {
  try {
    const result = await user.find();
    const users = [];

    for (const user of result) {
      const subuser = {
        id: user.id,
        name: user.name,
        user_role: user.role,
        nick: user.nick,
        email: user.email,
        created_routes: user.created_routes,
      };
      users.push(subuser);
    }

    return res.status(200).json({
      users: users,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ha habido un error",
    });
  }
};

module.exports = { consulta };
