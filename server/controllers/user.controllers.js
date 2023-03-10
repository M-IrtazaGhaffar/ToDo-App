const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const userModel = require("../models/user.model");

const getUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel
      .find({
        email: email,
      })
      // .then();
      console.log(user);
    const passVerify = bcrypt.compareSync(password, user[0].password);
    const JWToken = jwt.sign(
      {
        username: user[0].username,
        email: user[0].email,
      },
      process.env.SECRET,
      {
        expiresIn: "24h",
      }
    );
    console.log(passVerify);
    if (passVerify)
      res.status(200).json({
        username: user[0].username,
        loggedIn: true,
        token: JWToken,
        email: user[0].email,
      });
    else
      res.status(200).json({
        loggedIn: false,
        message: "Email or Password don't match!",
      });
  } catch (error) {
    res.status(200).json({
      loggedIn: false,
      message: "Email or Password don't match!",
    });
  }
};

const setUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPass = bcrypt.hashSync(password, 10);
  try {
    await userModel
      .create({
        username: username,
        email: email,
        password: hashedPass,
      })
      .then((docs) => {
        const JWToken = jwt.sign(
          {
            username: docs.username,
            email: docs.email,
          },
          process.env.SECRET,
          {
            expiresIn: "24h",
          }
        );
        res.status(200).json({
          username: docs.username,
          loggedIn: true,
          token: JWToken,
          email: docs.email,
        });
      });
  } catch (error) {
    console.log("Error: " + error);
    res.status(200).json({
      loggedIn: false,
      message: "Use another email!",
    });
  }
};
const createTodo = async (req, res) => {
  const { email, todoTitle, todoDesc, todoDate } = req.body;
  try {
    const user = await userModel
      .findOneAndUpdate(
        {
          email: email,
        },
        {
          $push: {
            todos: {
              title: todoTitle,
              desc: todoDesc,
              status: "Pending",
              end: todoDate,
            },
          },
        }
      )
      .then();
    res.status(200).json({
      loggedIn: true,
      inserted: true,
    });
  } catch (error) {
    console.log("Error: " + error);
    res.status(200).json({
      loggedIn: true,
      inserted: true,
    });
  }
};

const getTodos = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel
      .find({
        email: email,
      })
      .then();
    res.status(200).json({
      loggedIn: true,
      todos: user[0].todos,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      loggedIn: false,
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { email, status, id } = req.body;
    const user = await userModel
      .updateOne(
        {
          email: email,
          "todos._id": id,
        },
        {
          $set: {
            "todos.$.status": status,
          },
        }
      )
      .then();
    res.status(200).json({
      updated: true,
      loggenIn: true,
    });
  } catch (error) {
    res.status(200).json({
      updated: false,
      loggenIn: true,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel
      .findOne({
        email: email,
      })
      .then();
    if (user) {
      const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
      const token = jwt.sign({
        email: email,
      }, process.env.SECRET, {
        expiresIn: '1h'
      })
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Password reset link",
        text: 
        `Hi ${user.username}! 


Your password was said to be reset on ${new Date()}.Becareful and don't send this link to anyother person. This link will be expired in 1 hour. Please click on the given link below to reset your password.
        
http://${process.env.IP_ADDRESS}/new_password/${user._id}/${token}
        `
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.status(200).json({
        loggedIn: false,
        found: true,
        message: `Reset password link was sent to ${email}!`,
      });
    } else {
      res.status(200).json({
        loggedIn: false,
        found: false,
        message: `${email} is not registered!`,
      });
    }
  } catch (error) {
    console.log("Error" + error);
  }
};

const setPass = async (req, res) => {
  var { id, password } = req.body;
  try {
    password = bcrypt.hashSync(password, 10);
    const update = await userModel.findOneAndUpdate({
      _id: id
    }, {
      password: password
    });
    if (update) 
      res
        .status(200)
        .json({
          loggedIn: false,
          updated: true,
          email: update.email
        })
  } catch (error) {
      res
        .status(200)
        .json({
          loggedIn: false,
          updated: false
        })
  }
}

module.exports = {
  getUser,
  setUser,
  getTodos,
  createTodo,
  updateTodo,
  forgotPassword,
  setPass
};
