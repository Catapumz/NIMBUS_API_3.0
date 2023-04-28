const express = require("express");
const router = express.Router();
const { pruebaUser, register, login } = require("../controllers/user");
const auth = require("../middlewares/auth");

router.get("/user", auth.auth, pruebaUser);
router.post("/user/register", register);
router.post("/user/login", login);

module.exports = router;
