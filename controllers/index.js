// handdles exportered middleWare
const { authMiddleware } = require("../middlewares");

// exports all modules to be used in routes
module.exports = {
  SIGN_Up: (req, res) => {
    //   // if there is no input this middleware will handdle response of error and message.
    const { error, message } = authMiddleware(req.body);

    if (error) {
      res.send({
        message,
      });
    }
  },
};
