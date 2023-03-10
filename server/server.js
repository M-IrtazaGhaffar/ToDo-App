const { config } = require("dotenv");
const express = require("express");
const server = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user.routes");
const adminRouter = require("./routes/admin.routes");
const connection = require("./databases/db.connection");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

// Database Connection
mongoose.set('strictQuery', true);
connection();

// Middlewares
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// Routes
server.use('/user', userRouter);
server.use('/admin', adminRouter);

//Listening
server.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}!`)
);
