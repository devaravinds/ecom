const router = require("express").Router();

const {signup} = require("../controller/user-controller");

router.post("/signup", signup);

module.exports = router;