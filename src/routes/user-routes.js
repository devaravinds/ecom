const router = require("express").Router();
const { signup, login } = require("../controller/user-controller");
const { signUpValidation } = require("../middleware/validations/user-validator");

/**
 * @swagger
 * /users/signup:
 *   post:
 *     tags:
 *       - Users
 *     summary: Sign up
 *     description: API to sign up new users.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/sign-up-component'
 *     responses:
 *       200:
 *         description: Successful user creation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 message:
 *                   type: string
 *                   description: Message indicating successful account creation
 *         
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                       value:
 *                         type: string
 *                       msg:
 *                         type: string
 *                       path:
 *                         type: string
 *                       location:
 *                         type: string
 * components:
 *  schemas:
 *    sign-up-component:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          example: user
 *        email:
 *          type: string
 *          format: email
 *        password:
 *          type: string
 *          example: password123
 */
router.post("/signup", signUpValidation, signup);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Login
 *     description: API to login for users.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login-component'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           example: user@test.com
 *                         role:
 *                           type: string
 *                           example: user
 *                         name:
 *                           type: string
 *                           example: name
 *                     token:
 *                       type: string
 *                     expiresIn:
 *                       type: string
 *                       example: "5 days"
 *                 message:
 *                   type: string
 *                   example: "Login was successful"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                       value:
 *                         type: string
 *                       msg:
 *                         type: string
 *                       path:
 *                         type: string
 *                       location:
 *                         type: string
 * components:
 *   schemas:
 *     login-component:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           example: password123
 */

router.post("/login", login);

module.exports = router;
