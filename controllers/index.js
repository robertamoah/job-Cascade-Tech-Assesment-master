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
  // _________________________________________________________________________________________________

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

    const date1 = new Date().setDate(new Date().getDate());
    // new User object
    const newUser = await new UserSchema({
      email: email,
      password: password,
      phone: phone,
      date: date1,
    });

    //  merges and creates a new data, to prevent mutation
    const mainParse = User.users;
    const mainObjectParse = newUser.email;
    const mainUserLogs = User.sucessLogIn;
    const mainUserFailedLogs = User.failedLogIn;

    const loginInfilleds = {
      type: "LOGIN",
      created: date1,
      email: email,
    };
    const merge = {
      users: [mainObjectParse, ...mainParse],

      sucessLogIn: [...mainUserLogs],

      failedLogIn: [...mainUserFailedLogs],
    };

    // dummy database
    const saveJson = (jsonContent) => {
      // dummy database
      fs.writeFile("index.json", jsonContent, "utf8", function (err) {
        if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
        }
        console.log("JSON file has been saved.");
        let message = `User Logined`;
        return res.send({
          success: true,
          message: message,
          status: 200,
        });
      });
    };

    // stringify JSON Object
    let jsonContent = JSON.stringify(merge);

    // save data to json function
    saveJson(jsonContent);
  },

  // _________________________________________________________________________________________________

  LOGIN: async (req, res) => {
    // new User object
    // Checking to see if there is an already existing user
    const { email } = req.body;

    const filterUser = await User.users.filter((email) => {
      return (
        email.email === req.body.email && email.password === req.body.password
      );
    });

    //  merges and creates a new data, to prevent mutation
    const mainParse = User.users;
    const mainUserLogs = User.sucessLogIn;
    const mainUserFailedLogs = User.failedLogIn;

    const date1 = new Date().setDate(new Date().getDate());

    if (filterUser.length !== 1) {
      const loginInfilleds = {
        type: "LOGIN",
        created: date1,
        email: email,
      };

      const merge = {
        users: [...mainParse],
        sucessLogIn: [...mainUserLogs],

        failedLogIn: [loginInfilleds, ...mainUserFailedLogs],
      };

      const saveJson = (jsonContent) => {
        // dummy database
        fs.writeFile("index.json", jsonContent, "utf8", function (err) {
          if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
          }
          console.log("JSON file has been saved.");
          let message = `User Logined`;
          return res.send({
            success: true,
            message: message,
            status: 200,
          });
        });
      };

      // stringify JSON Object
      let jsonContent = JSON.stringify(merge);

      // save data to json function
      saveJson(jsonContent);

      let message = `email or password is invalid`;
      return res.send({
        success: false,
        message: message,
      });
    }

    const date2 = new Date().setDate(new Date().getDate() - 1);

    const loginInfilleds = {
      type: "LOGIN",
      created: date2,
      email: email,
    };

    const merge = {
      users: [...mainParse],

      sucessLogIn: [loginInfilleds, ...mainUserLogs],

      failedLogIn: [...mainUserFailedLogs],
    };

    const saveJson = (jsonContent) => {
      // dummy database
      fs.writeFile("index.json", jsonContent, "utf8", function (err) {
        if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
        }
        console.log("JSON file has been saved.");
        let message = `User Logined`;
        return res.send({
          success: true,
          message: message,
          status: 200,
        });
      });
    };

    // stringify JSON Object
    let jsonContent = JSON.stringify(merge);

    // save data to json function
    saveJson(jsonContent);
  },
  // _________________________________________________________________________________________________

  // - return all failed login events for all users
  CASE_Failed_LogIn: async (req, res) => {
    const filterUser = await User.failedLogIn.filter((email) => {
      return email;
    });
    res.send({
      data: filterUser,
      info: `all failed login events for all users`,
    });
  },

  // _________________________________________________________________________________________________

  // - return all login events for a single user
  CASE_SingleUser_LOGS: async (req, res) => {
    const filterUsersuccess = await User.sucessLogIn.filter((email) => {
      return email.email === req.body.email;
    });

    const filterUserfails = await User.failedLogIn.filter((email) => {
      return email.email === req.body.email;
    });

    res.send({
      data: {
        failLogs: filterUserfails,
        successLogs: filterUsersuccess,
        info: `all login events for a single user`,
      },
    });
  },

  // _________________________________________________________________________________________________

  // - return all events for the day before last
  CASE_dayBefore_LOGS: async (req, res) => {
    // merges all events logs
    // ____________________________________________________________________
    const filterUsersuccess = User.sucessLogIn.filter((email) => {
      return email.email === req.body.email;
    });
    const filterUserfails = User.failedLogIn.filter((email) => {
      return email.email === req.body.email;
    });
    // _________________________________________________________________

    // get today date
    // const today = new Date().toJSON();
    const mainData = [filterUserfails, ...filterUsersuccess];
    const today = new Date().setDate(new Date().getDate());
    // ____________________________________________________________________

    // filter the merged events to get all events from the day before last
    const filteringMain = mainData.filter((index) => {
      return index.created < today;
    });

    res.send({
      filteringMain: filteringMain,
      info: "all events from the day before last",
    });
  },

  // _________________________________________________________________________________________________

  // - return all events for the week before not including session timeout
  CASE_weekBefore_LOGS: async (req, res) => {
    // merges all events logs
    // ____________________________________________________________________
    const filterUsersuccess = User.sucessLogIn.filter((email) => {
      return email.email === req.body.email;
    });
    const filterUserfails = User.failedLogIn.filter((email) => {
      return email.email === req.body.email;
    });
    // _________________________________________________________________

    // get today date
    // const today = new Date().toJSON();
    const mainData = [filterUserfails, ...filterUsersuccess];
    const weekBefore = new Date().setDate(new Date().getDate());
    // ____________________________________________________________________

    // filter the merged events to get all events from the day before last
    const filteringMain = mainData.filter((index) => {
      return index.created <= weekBefore;
    });

    res.send({
      filteringMain: filteringMain,
      info: "all events from the week before",
    });
  },
};
