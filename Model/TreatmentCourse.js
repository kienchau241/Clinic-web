const ModelSchema = require("./ModelSchema");
const ModelSchemaValidator = require("./ModelSchemaValidator");
const sql = require("mssql");

// TreatmentCourse = TreatmentC
const TreatmentCSchema = new ModelSchema(
  {
    id: new ModelSchemaValidator({
      name: "id",
      sqlType: sql.Int,
    }),
    name: new ModelSchemaValidator({
      name: "name",
      sqlType: sql.VarChar,
      require: true,
    }),
    description: new ModelSchemaValidator({
      name: "description",
      sqlType: sql.VarChar,
      require: true,
      validator: function (val) {
        return val.length >= 0;
      },
    }),
    ratingsAverage: new ModelSchemaValidator({
      name: "ratingsAverage",
      sqlType: sql.Float,
      default: 4.5,
      validator: function (val) {
        return val >= 0 && val <= 5;
      },
    }),
    ratingsQuantity: new ModelSchemaValidator({
      name: "ratingsQuantity",
      sqlType: sql.Int,
      default: 0,
      validator: function (val) {
        return val >= 0;
      },
    }),
    price: new ModelSchemaValidator({
      name: "price",
      sqlType: sql.Int,
      require: true,
      validator: function (val) {
        return val >= 0;
      },
    }),
    createdAt: new ModelSchemaValidator({
      name: "createdAt",
      sqlType: sql.DateTime,
      default: 0,
      require: true,
    }),
    idDis: new ModelSchemaValidator({
      name: "idDis",
      sqlType: sql.Int,
      require: true,
    }),
  },
  "TreatmentCourse",
  "createdAt"
);

module.exports = TreatmentCSchema;
