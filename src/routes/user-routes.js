const router = require("express").Router();
const { signup, login, createAdmin, changePassword } = require("../controller/user-controller");
const { ensureAuthenticated, ensureAuthorized } = require("../middleware/user-middleware");
const { signUpValidation, loginValidation, changePasswordValidation} = require("../middleware/validations/user-validator");
const roles = require("../enum/roles");

router.post("/signup", signUpValidation, signup);

router.post("/login", loginValidation, login);

router.post(
  "/createAdmin",
  signUpValidation,
  ensureAuthenticated,
  ensureAuthorized([roles.SUPER_ADMIN]),
  createAdmin
);

router.put(
  "/changePassword",
  changePasswordValidation,
  ensureAuthenticated,
  changePassword
);
module.exports = router;
