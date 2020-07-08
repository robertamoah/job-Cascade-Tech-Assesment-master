// file system module to perform file operations
const fs = require("fs");

// User schema
const UserSchema = require("../models/index");

// DataBase
let User = require("../index.json");

// handdles exportered middleWare
const { authMiddleware } = require("../middlewares");
const { json } = require("body-parser");

// exports all modules to be used in routes
module.exports = {
  SIGN_Up: async (req, res) => {
    // if there is no input this middleware will handdle response of error and message.
    const { error, message } = await authMiddleware(req.body);

    if (error) res.send({ message });

    const { email, password, phone } = req.body;

    // Checking to see if there is an already existing user
    const filterUser = await User.users.filter((email) => {
      return email.email === req.body.email;
    });
    if (filterUser.length !== 0) {
      let message = `email already exists`;
      return res.send({
        success: false,
        message: message,
      });
    }

    // new User object
    const newUser = await new UserSchema({
      email: email,
      password: password,
      phone: phone,
      date: new Date(),
    });

    //  merges and creates a new data, to prevent mutation
    const mainParse = User.users;
    const mainObjectParse = newUser.email;
    const mainUserLogs = User.sucessLogIn;

    const loginInfilleds = { type: "LOGIN", created: new Date(), email: email };
    const merge = {
      users: [mainObjectParse, ...mainParse],
      UserLogs: [loginInfilleds, ...mainUserLogs],
    };
    // stringify JSON Object
    let jsonContent = JSON.stringify(merge);

    // dummy database
    await fs.writeFile("index.json", jsonContent, "utf8", function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }

      console.log("JSON file has been saved.");

      let message = `User created`;
      res.send({
        success: true,
        message: message,
        status: 200,
      });
    });
  },

  LOGIN: async (req, res) => {
    // new User object
    // Checking to see if there is an already existing user
    const { email } = req.body;

    const filterUser = await User.users.filter((email) => {
      return (
        email.email === req.body.email && email.password === req.body.password
      );
    });

    // console.log(filterUser);

    if (filterUser.length !== 1) {
      let message = `email or password is invalid`;
      return res.send({
        success: false,
        message: message,
      });
    }

    //  merges and creates a new data, to prevent mutation
    const mainParse = User.users;
    const mainUserLogs = User.sucessLogIn;

    const loginInfilleds = {
      type: "LOGIN",
      created: new Date(),
      email: email,
    };
    const merge = {
      users: [...mainParse],
      sucessLogIn: [loginInfilleds, ...mainUserLogs],
    };

    // stringify JSON Object
    let jsonContent = JSON.stringify(merge);

    // dummy database
    await fs.writeFile("index.json", jsonContent, "utf8", function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }

      console.log("JSON file has been saved.");

      let message = `User Logined`;
      res.send({
        success: true,
        message: message,
        status: 200,
      });
    });
  },

  // - return all failed login events for all users
  CASE_Failed_LogIn: async (req, res) => {
    const filterUser = await User.sucessLogIn.filter((email) => {
      return email;
    });
    res.send({
      data: filterUser,
    });
  },

  // - return all login events for a single user
  CASE_SingleUser_LOGS: async (req, res) => {
    const filterUser = await User.sucessLogIn.filter((email) => {
      return email.email === req.body.email;
    });
    res.send({
      data: filterUser,
    });
  },

  // - return all events for the day before last
  CASE_dayBefore_LOGS: async () => {
    res.send({
      data: filterUser,
    });
  },

  // - return all events for the week before not including session timeout

  CASE_weekBefore_LOGS: async () => {
    res.send({
      data: filterUser,
    });
  },
};
