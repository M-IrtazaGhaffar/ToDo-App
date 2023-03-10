const express = require("express");
const userRouter = express.Router();
const {
  getUser,
  setUser,
  getTodos,
  updateTodo,
  createTodo,
  forgotPassword,
  setPass,
} = require("../controllers/user.controllers");
const authJWT = require("../middlewares/auth.middlewares");

userRouter
  // POST Methods
  .post("/getTodos", authJWT, getTodos)
  .post("/login", getUser)
  .post("/signup", setUser)
  .post("/createTodo", authJWT, createTodo)
  .post('/resetPassword', setPass)
  .post('/forgotPassword', forgotPassword)
  // PUT Methods
  .put("/updateTodo", updateTodo);

module.exports = userRouter;
