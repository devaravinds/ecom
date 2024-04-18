const router = require("express").Router();
const { signup } = require("../controller/user-controller");
const {
  signUpValidation,
} = require("../middleware/validations/user-validator");

router.post("/signup", signUpValidation, signup);

module.exports = router;
