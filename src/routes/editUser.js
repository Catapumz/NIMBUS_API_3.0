const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const { editar } = require("../controllers/editUser");

router.put("/users/:id", auth.auth, editar);

module.exports = router;
