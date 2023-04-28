const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const { borrar } = require("../controllers/deleteUser");

router.delete("users/:id", auth.auth, borrar);

module.exports = router;
