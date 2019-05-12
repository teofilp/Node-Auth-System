const express = require('express');
require('../db/mongoose');
const userRouter = require('../routes/user');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(userRouter);

module.exports = app;