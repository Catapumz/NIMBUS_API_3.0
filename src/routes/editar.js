const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const { editar } = require("../controllers/editar");

router.put("/routes/:id", auth.auth, editar);

module.exports = router;
