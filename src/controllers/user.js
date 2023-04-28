const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("../helpers/jwt");

const pruebaUser = (req, res) => {
  return res.status(200).json({
    mesage: "Mensaje enviado desde controllers/user",
  });
};

const register = async (req, res) => {
  //recoger datos de la peticion
  let params = req.body;

  //comprobar que me llegan bien (+ validacion)
  if (!params.name || !params.email || !params.password || !params.nick) {
    return res.status(400).json({
      mesage: "Faltan datos por enviar",
    });
  }
  let user_to_save = new User(params);
  //control de usuarios duplicados
  try {
    const users = await User.find({
      $or: [
        { email: user_to_save.email.toLowerCase() },
        { nick: user_to_save.nick.toLowerCase() },
      ],
    });
    if (users && users.length >= 1) {
      return res.status(500).json({
        status: "error",
        message: "El usuario ya existe",
      });
    }
  } catch (error) {
    if (error) {
      console.log(error);
      return res.status(500).json({
        status: "error",
        message: "Error en la consulta de usuarios",
      });
    }
  }

  //cifrar la contraseña
  let pwd = await bcrypt.hash(user_to_save.password, 10);
  user_to_save.password = pwd;

  //guardar usuario en la base de datos
  try {
    const userStored = await user_to_save.save();
    if (userStored) {
      return res.status(200).json({
        mesage: "Accion de registro de usuarios",
        userStored,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al guardar el nuevo usuario",
    });
  }
};

const login = async (req, res) => {
  //Recoger parametros en body
  let params = req.body;

  if (!params.email || !params.password) {
    return res.status(400).send({
      message: "Faltan datos por enviar",
    });
  }
  //Buscar en la db si existe
  try {
    const user = await User.findOne({ email: params.email });

    //Comprobar su contraseña
    const pwd = await bcrypt.compareSync(params.password, user.password);
    const token = await jwt.createToken(user);

    if (user && pwd) {
      return res.status(200).send({
        status: "success",
        message: "Accion de login",
        user: {
          user: user.id,
          nick: user.nick,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } else if (!user || !pwd) {
      return res.status(500).send({
        message: "Las credenciales que has introducido no son correctas",
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Ha ocurrido un error",
    });
  }

  //Devolver token

  //datos del usuario
};

//export actions
module.exports = {
  pruebaUser,
  register,
  login,
};
