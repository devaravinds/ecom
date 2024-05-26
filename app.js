
const express = require("express");

require('dotenv').config()

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: process.env.MAX_FILE_SIZE }))

app.use('/users', require('./src/routes/user-routes'))
app.use('/category', require('./src/routes/category-routes'))

module.exports = app;
