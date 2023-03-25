const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const app = require("./app");
const sql = require("mssql");
const dbConfig = require("./database/dbconfig");

//https://www.npmjs.com/package/mssql#asyncawait => Global Pool Single Instance
const appPool = new sql.ConnectionPool(dbConfig.sqlConfig);
appPool
  .connect()
  .then(function (pool) {
    console.log("SQL Connected!");
    dbConfig.db.pool = pool;
  })
  .catch(function (err) {
    console.error("Error creating connection pool", err);
  });

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
