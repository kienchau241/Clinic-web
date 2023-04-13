const ModelSchema = require("./ModelSchema");
const ModelSchemaValidator = require("./ModelSchemaValidator");
const sql = require("mssql");

const DiseasesSchema = new ModelSchema(
  {
    idDis: new ModelSchemaValidator({
      name: "idDis",
      sqlType: sql.Int,
    }),
    nameDis: new ModelSchemaValidator({
      name: "nameDis",
      sqlType: sql.VarChar,
      require: true,
    }),
    Cause: new ModelSchemaValidator({
      name: "Cause",
      sqlType: sql.VarChar,
      require: true,
    }),
    Condition: new ModelSchemaValidator({
      name: "Condition",
      sqlType: sql.VarChar,
      require: true,
    }),
  },
  "Diseases",
  "idDis"
);

module.exports = DiseasesSchema;
