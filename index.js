const app = require("./app");
require("dotenv").config();
const connectDB = require("./src/config/db");

const port = process.env.PORT || 3001;

connectDB();

app.listen(process.env.PORT, () => {
  console.log("listening on port ", port);
});
