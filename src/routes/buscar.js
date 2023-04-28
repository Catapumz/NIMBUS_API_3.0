const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const { consulta } = require("../controllers/buscar");

router.get("/buscar", auth.auth, consulta);

module.exports = router;
