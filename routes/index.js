// eported controllers object
const controllers = require("../controllers/index");
// all routes goes here
module.exports = (app) => {
  // handdles routes for user signup
  app.route("/user/signup").post(controllers.SIGN_Up);
};
