//importar modulos
const jwt = require("jwt-simple");
const moment = require("moment");

//imporar clave secreta
const libjwt = require("../helpers/jwt");
const secret = libjwt.secret;

//funcion de autenticacion
const auth = (req, res, next) => {
  //comprobar si me llega la cabecera de auth
  if (!req.headers.authorization) {
    return res.status(200).json({
      status: "error",
      message: "La petición no tiene la cabecera de autenticacion",
    });
  }

  //limpiar el token
  let token = req.headers.authorization.replace(/['"]+/g, "");
  //console.log(token);

  //decodificar el token
  try {
    let payload = jwt.decode(token, secret);

    //comprobar expiracion del token
    if (payload.exp <= moment().unix()) {
      return res.status(401).json({
        message: "Token expirado",
      });
    }
    req.user = payload;
  } catch (error) {
    return res.status(404).json({
      message: "Token inválido",
    });
  }
  next();
};
//agregar datos de usuario a request

//pasar a ejecucion de accion

module.exports = { auth };
