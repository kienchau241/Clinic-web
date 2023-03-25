const ModelSchema = require("./ModelSchema");
const ModelSchemaValidator = require("./ModelSchemaValidator");
const sql = require("mssql");

// TreatmentCourse = TreatmentC
const TreatmentCSchema = new ModelSchema({
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
    require: true,
  }),
  reviewID: new ModelSchemaValidator({
    name: "reviewID",
    sqlType: sql.Int,
    require: true,
  }),
  idDis: new ModelSchemaValidator({
    name: "idDis",
    sqlType: sql.Int,
    require: true,
  }),
});

module.exports = TreatmentCSchema;
