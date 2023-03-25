const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  const requestTime = new Date().toISOString();
  // console.log(requestTime);
  req.requestTime = requestTime;
  next();
});

const courseRoute = require("./Route/TreatmentCourse");

app.use("/api/v1/coures", courseRoute);

module.exports = app;
