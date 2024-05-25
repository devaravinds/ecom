const app = require("./app");
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const connectDB = require("./src/config/db");
const logger = require("./src/config/logger");

require("dotenv").config();

const port = process.env.PORT || 3000;

connectDB();

app.listen(process.env.PORT, () => {
  logger.info(`Listening on port: ${port}`);
});
