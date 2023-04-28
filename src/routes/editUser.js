const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const { editar } = require("../controllers/editUser");

router.put("/user/edit/:id", auth.auth, editar);

module.exports = router;
