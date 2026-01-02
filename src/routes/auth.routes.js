const express = require("express");
const { registerUser, loginUser } = require("../controller/auth.controller");

const router = express.Router();
const validate = require("../middlewares/validate");
const { registerSchema, loginSchema } = require("../validator/auth.validator");

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

module.exports = router;
