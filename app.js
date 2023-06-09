const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const app = express();
const bodyParser = require("body-parser");
var methodOverride = require("method-override");

var hbs = exphbs.create({
  defaultLayout: "main",
  extname: ".hbs",
  helpers: {
    sum: (a, b) => a + b,
  },
});

//Template engine
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

app.use(morgan("dev"));
app.use(express.json());
app.use(methodOverride("_method"));

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
const ReviewRoute = require("./Routes/Review");
const postRoute = require("./Routes/post");
const AppRoute = require("./Routes/Appointment");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/courses", courseRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/disease", disRoute);
app.use("/api/v1/review", ReviewRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/appointment", AppRoute);

module.exports = app;
