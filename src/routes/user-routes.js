const router = require("express").Router();
const { signup, login, createAdmin, changePassword, deleteProfile, deleteAdmin } = require("../controller/user-controller");
const { ensureAuthenticated, ensureAuthorized } = require("../middleware/user-middleware");
const { signUpValidation, loginValidation, changePasswordValidation} = require("../middleware/validations/user-validator");
const roles = require("../enum/roles");

router.post("/signup", signUpValidation, signup);

router.post("/login", loginValidation, login);

router.post("/create-admin", signUpValidation, ensureAuthenticated, ensureAuthorized([roles.SUPER_ADMIN]), createAdmin );

router.put("/change-password", changePasswordValidation, ensureAuthenticated, changePassword);

router.delete("/delete", ensureAuthenticated, deleteProfile)

router.delete("/delete-admin", ensureAuthenticated, ensureAuthorized([roles.SUPER_ADMIN]), deleteAdmin)

module.exports = router;
