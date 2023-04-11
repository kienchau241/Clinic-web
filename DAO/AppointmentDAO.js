const dbConfig = require("../database/dbconfig");
const dbUtils = require("../utils/dbutils");
const AppoinmentSchema = require("../Model/Appointment");

exports.GetAllApp = async function (filter) {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }
  let query = `SELECT * from ${AppoinmentSchema.schemaName}`;
  let countQuery = `SELECT COUNT(DISTINCT ${AppoinmentSchema.schema.idApp.name}) as totalItem from ${AppoinmentSchema.schemaName}`;

  const page = filter.page * 1 || 1;
  let pageSize = filter.pageSize * 1 || StaticData.config.MAX_PAGE_SIZE;
  if (pageSize > StaticData.config.MAX_PAGE_SIZE) {
    pageSize = StaticData.config.MAX_PAGE_SIZE;
  }
  const { filterStr, paginationStr } = dbUtils.getFilterQuery(
    AppoinmentSchema.schema,
    filter,
    page,
    pageSize,
    AppoinmentSchema.defaultSort
  );

  if (filterStr) {
    query += " " + filterStr;
    countQuery += " " + filterStr;
  }

  if (paginationStr) {
    query += " " + paginationStr;
  }
  // console.log(query);
  const result = await dbConfig.db.pool.request().query(query);
  let countResult = await dbConfig.db.pool.request().query(countQuery);

  let totalItem = 0;
  if (countResult.recordsets[0].length > 0) {
    totalItem = countResult.recordsets[0][0].totalItem;
  }
  let totalPage = Math.ceil(totalItem / pageSize); //round up

  const Appointment = result.recordsets[0];

  return {
    page,
    pageSize,
    totalPage,
    totalItem,
    Appointment: Appointment,
  };
};

exports.getAppById = async function (id) {
  if (!dbconfig.db.pool) {
    throw new Error("Not connected to db");
  }

  let request = dbconfig.db.pool.request();
  let result = await request
    .input(
      AppoinmentSchema.schema.id.name,
      AppoinmentSchema.schema.id.sqlType,
      id
    )
    .query(
      `select * from ${AppoinmentSchema.schemaName} where ${AppoinmentSchema.schema.id.name} = @${AppoinmentSchema.schema.id.name}`
    );
  let course = result.recordsets[0][0];
  // console.log(result);
  return course;
};

exports.createNewApp = async (appointment) => {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }
  if (!appointment) {
    throw new Error("Invalid input param");
  }
  let now = new Date();
  appointment.createdAt = now.toISOString();
  let insertData = TourSchema.validateData(appointment);
  let query = `insert into ${AppoinmentSchema.schemaName}`;
  const { request, insertFieldNamesStr, insertValuesStr } =
    dbUtils.getInsertQuery(
      AppoinmentSchema.schema,
      dbConfig.db.pool.request(),
      insertData
    );

  query += " (" + insertFieldNamesStr + ") values (" + insertValuesStr + ")";
  console.log(query);

  let result = await request.query(query);
  // console.log(result);
  return result.recordsets;
};

exports.deleteApp = async (id) => {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }
  let request = dbConfig.db.pool.request();
  let result = await request
    .input(
      AppoinmentSchema.schema.idApp.name,
      AppoinmentSchema.schema.idApp.sqlType,
      id
    )
    .query(
      `delete ${AppoinmentSchema.schemaName} where ${AppoinmentSchema.schema.idApp.name} = @${AppoinmentSchema.schema.idApp.name}`
    );

  // console.log(result);
  return result.recordsets;
};

exports.updateApp = async (id, updateInfo) => {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }
  if (!updateInfo) {
    throw new Error("Invalid input param");
  }
  let query = `update ${AppoinmentSchema.schemaName} set`;

  const { request, updateStr } = dbUtils.getUpdateQuery(
    AppoinmentSchema.schema,
    dbConfig.db.pool.request(),
    updateInfo
  );
  if (!updateStr) {
    throw new Error("Invalid update param");
  }
  request.input(
    AppoinmentSchema.schema.idApp.name,
    TourSchema.schema.idApp.sqlType,
    id
  );
  query +=
    " " +
    updateStr +
    ` where ${AppoinmentSchema.schema.idApp.name} = @${AppoinmentSchema.schema.idApp.name}`;
  console.log(query);
  let result = await request.query(query);
  // console.log(result);
  return result.recordsets;
};
