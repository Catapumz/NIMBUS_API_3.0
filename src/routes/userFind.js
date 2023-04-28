const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const { consulta } = require("../controllers/userFind");

router.get("/user/find/:find", auth.auth, consulta);

module.exports = router;
