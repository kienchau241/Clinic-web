const dotenv = require("dotenv");
const sql = require("mssql");

dotenv.config({
  path: "../config.env",
});

const dbconfig = require("./dbconfig");
const appPool = new sql.ConnectionPool(dbconfig.sqlConfig);

const fs = require("fs");
const TreatmentCourseDAO = require("../DAO/TreatmentCourse");
