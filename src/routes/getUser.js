const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const { consulta } = require("../controllers/getUser");

router.put("/user/getUser/:id", auth.auth, consulta);

module.exports = router;