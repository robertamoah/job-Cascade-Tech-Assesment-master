const express = require("express");
const app = express();

// process port for heroku if needed
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add routes, both API and vie
const routes = require("./routes/index")(app);

// server callback for listening
app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
