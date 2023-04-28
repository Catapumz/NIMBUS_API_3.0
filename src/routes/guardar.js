const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const { crear } = require("../controllers/guardar");

// Rutas de pruebas
router.post("/routes", auth.auth, crear);

module.exports = router;
