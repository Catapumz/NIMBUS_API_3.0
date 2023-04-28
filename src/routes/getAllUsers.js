const express = require("express");
const router = express.Router();
const { consulta } = require("../controllers/getAllUsers");
const auth = require("../middlewares/auth");

router.get("/user/getAllUsers", auth.auth, consulta);

module.exports = router;
