const ModelSchema = require("./ModelSchema");
const ModelSchemaValidator = require("./ModelSchemaValidator");
const sql = require("mssql");

const TreatmentPrSchema = new ModelSchema(
  {
    userId: new ModelSchemaValidator({
      name: "userId",
      sqlType: sql.Int,
      require: true,
    }),
    TreatmentCourseId: new ModelSchemaValidator({
      name: "TreatmentCourseId",
      sqlType: sql.Int,
      require: true,
    }),
  },
  "TreatmentProcess",
  "TreatmentCourseId"
);

module.exports = TreatmentPrSchema;
