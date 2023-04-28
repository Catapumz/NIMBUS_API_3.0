const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const { borrar } = require("../controllers/borrar");

router.delete("/borrar/:id?", auth.auth, borrar);

module.exports = router;
