const router = require("express").Router();
const { addCategory } = require('../controller/category-controller');
const roles = require("../enum/roles");
const { ensureAuthenticated, ensureAuthorized } = require("../middleware/user-middleware");


router.post("/add-category", ensureAuthenticated, ensureAuthorized([roles.ADMIN, roles.SUPER_ADMIN]), addCategory);

module.exports = router;
