const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("../swagger.json");

//routes
const routes_listar = require("./routes/listar");
const routes_guardar = require("./routes/guardar");
const routes_borrar = require("./routes/borrar");
const routes_editar = require("./routes/editar");
const routes_buscar = require("./routes/buscar");
const routes_rate = require("./routes/rate");
//users
const user_user = require("./routes/user");
const user_getAllUser = require("./routes/getAllUsers");
const user_getUser = require("./routes/getUser");
const user_editUser = require("./routes/editUser");
const user_delete = require("./routes/deleteUser");
const user_find = require("./routes/userFind");

//Crear servidor Node
const app = express();

app.use(cors()); //middleware (?)

//Convertir body a objeto js
app.use(express.json()); //recibir datos con content-type app/json
app.use(express.urlencoded({ extended: true })); //recibir datos form-urlencoded

//rutas relacionadas con las vias
app.use("/", routes_listar);
app.use("/", routes_guardar);
app.use("/", routes_borrar);
app.use("/", routes_editar);
app.use("/", routes_buscar);
app.use("/", routes_rate);

//rutas relacionadas con los usuarios
app.use("/", user_getUser);
app.use("/", user_getAllUser);
app.use("/", user_user);
app.use("/", user_editUser);
app.use("/", user_delete);
app.use("/", user_find);

//rutas documentacion
app.use("/documentacion", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = { app };
