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

// app.use("/", (req, res) => {
//   res.status(200).json({
//     code: 200,
//     msg: "1234",
//   });
// });

// app.get("/", (req, res) => {
//   res.render("home");
// });

const courseRoute = require("./Routes/TreatmentCourse");

app.use("/api/v1/courses", courseRoute);

module.exports = app;
