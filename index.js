const app = require("./app")
require('dotenv').config()

const port = process.env.PORT || 3001

// const databaseConnect = require("./dbConnect");
// databaseConnect.connectDb();

app.listen(process.env.PORT, () => {
    console.log("listening on port ",port)
})
