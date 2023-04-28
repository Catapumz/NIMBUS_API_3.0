const express = require("express");
const router = express.Router();
const { pruebaUser, register, login } = require("../controllers/user");
const auth = require("../middlewares/auth");

router.get("/user", auth.auth, pruebaUser);
router.post("/users/register", register);
router.post("/users/login", login);

module.exports = router;
