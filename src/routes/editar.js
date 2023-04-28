const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const { editar } = require("../controllers/editar");

router.put("/editar/:id", auth.auth, editar);

module.exports = router;
