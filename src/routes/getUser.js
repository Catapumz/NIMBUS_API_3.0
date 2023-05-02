const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const { consulta } = require("../controllers/getUser");

router.get("/users/:id", auth.auth, consulta);

module.exports = router;
