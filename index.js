const app = require("./app");
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
require("dotenv").config();

const port = process.env.PORT || 3000;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecom",
      version: "1.0.0",
      description: "Ecom platform created by Mahima and Dev"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          scheme: 'Bearer',
        }
      }
    }
  },
  apis: ["./src/routes/*.js"]
}



const specs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const connectDB = require("./src/config/db");
connectDB();

app.listen(process.env.PORT, () => {
  console.log("Listening on port ", port);
});
