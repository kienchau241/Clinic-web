const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const app = express();

//Template engine
app.engine("hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  const requestTime = new Date().toISOString();
  // console.log(requestTime);
  req.requestTime = requestTime;
  next();
});

app.get("/", (req, res) => {
  res.render("home");
});

const courseRoute = require("./Routes/TreatmentCourse");
const userRoute = require("./Routes/User");
const disRoute = require("./Routes/Disease");

app.use("/api/v1/courses", courseRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/disease", disRoute);

module.exports = app;
