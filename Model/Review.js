const ModelSchema = require("./ModelSchema");
const ModelSchemaValidator = require("./ModelSchemaValidator");
const sql = require("mssql");

const ReviewsSchema = new ModelSchema(
  {
    id: new ModelSchemaValidator({
      name: "id",
      sqlType: sql.Int,
    }),
    review: new ModelSchemaValidator({
      name: "review",
      sqlType: sql.VarChar,
      require: true,
      validator: function (val) {
        return val.length > 0;
      },
    }),
    rating: new ModelSchemaValidator({
      name: "rating",
      sqlType: sql.Float,
      validator: function (val) {
        return val >= 0 && val <= 5;
      },
    }),
    TreatmentId: new ModelSchemaValidator({
      name: "TreatmentId",
      sqlType: sql.Int,
      require: true,
    }),
    userId: new ModelSchemaValidator({
      name: "userId",
      sqlType: sql.Int,
      require: true,
    }),
    createdAt: new ModelSchemaValidator({
      name: "createdAt",
      sqlType: sql.DateTime,
      require: true,
    }),
  },
  "Reviews",
  "createdAt"
);

module.exports = ReviewsSchema;
