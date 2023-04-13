const ModelSchema = require("./ModelSchema");
const ModelSchemaValidator = require("./ModelSchemaValidator");
const sql = require("mssql");

const postSchema = new ModelSchema(
  {
    id: new ModelSchemaValidator({
      name: "id",
      sqlType: sql.Int,
    }),
    title: new ModelSchemaValidator({
      name: "title",
      sqlType: sql.VarChar,
      require: true,
      validator: function (val) {
        return val.length > 0;
      },
    }),
    content: new ModelSchemaValidator({
      name: "content",
      sqlType: sql.VarChar,
      require: true,
      validator: function (val) {
        return val.length > 0;
      },
    }),
    UserId: new ModelSchemaValidator({
      name: "UserId",
      sqlType: sql.Int,
      require: true,
      validator: function (val) {
        return val == 2 || val == 3;
      },
    }),
    postTime: new ModelSchemaValidator({
      name: "postTime",
      sqlType: sql.DateTime,
      require: true,
    }),
  },
  "post",
  "postTime"
);
module.exports = postSchema;
