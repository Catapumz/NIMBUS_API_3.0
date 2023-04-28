const jwt = require("jwt-simple");
const moment = require("moment");
require("dotenv").config();

const secret = process.env.secret;

const createToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    surname: user.surname,
    nick: user.nick,
    email: user.email,
    role: user.role,
    imagen: user.image,
    created_routes: user.created_routes,
    iat: moment().unix(),
    exp: moment().add(30, "days").unix(),
  };
  return jwt.encode(payload, secret);
};

module.exports = { createToken, secret };
