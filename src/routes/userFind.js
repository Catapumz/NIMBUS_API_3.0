const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const { consulta } = require("../controllers/userFind");

router.get("/users/:find", auth.auth, consulta);

module.exports = router;
