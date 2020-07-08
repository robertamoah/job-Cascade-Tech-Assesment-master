// eported controllers object
const controllers = require("../controllers/index");
// all routes goes here
module.exports = (app) => {
  // handdles routes for user signup
  app.route("/user/signup").post(controllers.SIGN_Up);
  app.route("/user/login").post(controllers.LOGIN);
  app.route("/user/casesfaillogs").get(controllers.CASE_Failed_LogIn);
  app.route("/user/singusercase").post(controllers.CASE_SingleUser_LOGS);
  app.route("/user/dayBefore").get(controllers.CASE_dayBefore_LOGS);
  app.route("/user/weekBefore").get(controllers.CASE_weekBefore_LOGS);
};
