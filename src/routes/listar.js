const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const { consulta } = require("../controllers/listar");

// Rutas de pruebas
router.get("/listar", auth.auth, consulta);

module.exports = router;
