const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const { rating } = require("../controllers/rate");

router.get("/rate/:id/:rate", auth.auth, rating);

module.exports = router;
