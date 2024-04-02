
const express = require("express");
// var cors = require('cors')
const app = express();
require('dotenv').config()
// const logger = require('morgan');
// const fs = require('fs');

// app.use(cors())
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json({ limit: process.env.MAX_FILE_SIZE })); //parse the incoming requests with JSON payloads

// app.use(logger('common', {
//     stream: fs.createWriteStream('./logs/access.log', {flags: 'a'})
// }));
// app.use(logger('dev'));


// app.use('/',require('./routes/user-routes'));
// app.use('/admin/',require('./routes/admin-routes'));
// app.use('/',require('./routes/category-routes'));
// app.use("/article/", require("./routes/article-routes"));
// app.use('/',require('./routes/analysis-routes'));
// app.use('/api/comments/',require('./routes/comments-routes'));
// app.use('/api/reactions/',require('./routes/reaction-routes'));
module.exports = app;
