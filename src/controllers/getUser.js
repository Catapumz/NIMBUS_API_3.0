const user = require("../models/user");

const consulta = async (req, res) => {
  const userId = req.user.id;
  const result = await user.findById(userId);
  const user = [];

  for (const user of result) {
    const subuser = {
      id: user.id,
      name: user.name,
      user_role: user.role,
      nick: user.nick,
      email: user.email,
      created_routes: user.created_routes,
    };
    user.push(subuser);
  }

  return res.status(200).json({
    users: user,
  });
};

module.exports = { consulta };
