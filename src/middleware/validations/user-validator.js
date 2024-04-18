const { body, validationResult } = require("express-validator");

const signUpValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Not a valid e-mail address")
    .escape(),
  body("name").notEmpty().escape(),
  body("password").isLength({ min: 8 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { signUpValidation };
