const ModelSchema = require("./ModelSchema");
const ModelSchemaValidator = require("./ModelSchemaValidator");
const sql = require("mssql");

const AppointmentSchema = new ModelSchema(
  {
    idApp: new ModelSchemaValidator({
      name: "idApp",
      sqlType: sql.Int,
    }),
    Patientid: new ModelSchemaValidator({
      name: "Patientid",
      sqlType: sql.Int,
      require: true,
      validator: function (val) {
        return (val = 1);
      },
    }),
    Doctorid: new ModelSchemaValidator({
      name: "PatienDoctoridtid",
      sqlType: sql.Int,
      require: true,
      validator: function (val) {
        return (val = 2);
      },
    }),
    AppTime: new ModelSchemaValidator({
      name: "AppTime",
      sqlType: sql.DateTime,
      require: true,
    }),
  },
  "Appointment",
  "idApp"
);

module.exports = AppointmentSchema;
