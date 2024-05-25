const router = require("express").Router();
const { signup, login, createAdmin } = require("../controller/user-controller");
const { ensureAuthenticated, ensureAuthorized } = require("../middleware/user-middleware");
const { signUpValidation } = require("../middleware/validations/user-validator");
const roles = require("../enum/roles");

router.post("/signup", signUpValidation, signup);

router.post("/login", login);

router.post("/createAdmin", signUpValidation, ensureAuthenticated, ensureAuthorized([roles.SUPER_ADMIN]), createAdmin)

module.exports = router;
