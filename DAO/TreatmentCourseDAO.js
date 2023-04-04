const dbUtils = require("../utils/dbutils");
const StaticData = require("../utils/StaticData");
const dbconfig = require("../database/dbconfig");

const TreatmentCSchema = require("../Model/TreatmentCourse");

exports.getallCourse = async function (filter) {
  if (!dbconfig.db.pool) {
    throw new Error("Not connected to db");
  }

  let query = `select * from ${TreatmentCSchema.schemaName}`;
  let countQuery = `SELECT COUNT(DISTINCT ${TreatmentCSchema.schema.id.name}) as totalItem from ${TreatmentCSchema.schemaName}`;

  const page = filter.page * 1 || 1;
  let pageSize = filter.pageSize * 1 || StaticData.config.MAX_PAGE_SIZE;
  if (pageSize > StaticData.config.MAX_PAGE_SIZE) {
    pageSize = StaticData.config.MAX_PAGE_SIZE;
  }

  const { filterStr, paginationStr } = dbUtils.getFilterQuery(
    TreatmentCSchema.schema,
    filter,
    page,
    pageSize,
    TreatmentCSchema.defaultSort
  );

  if (filterStr) {
    query += " " + filterStr;
    countQuery += " " + filterStr;
  }

  if (paginationStr) {
    query += " " + paginationStr;
  }
  //console.log(query);
  const result = await dbconfig.db.pool.request().query(query);
  let countResult = await dbconfig.db.pool.request().query(countQuery);

  let totalItem = 0;
  if (countResult.recordsets[0].length > 0) {
    totalItem = countResult.recordsets[0][0].totalItem;
  }
  let totalPage = Math.ceil(totalItem / pageSize); //round up

  const TreatmentCourses = result.recordsets[0];
  // for (let i = 0; i < TreatmentCourses.length; i++) {
  //   const TreatmentCourse = TreatmentCourses[i];
  //   await setTourInfo(TreatmentCourse);
  // }

  return {
    page,
    pageSize,
    totalPage,
    totalItem,
    TreatmentCourses: TreatmentCourses,
  };
};

exports.getCoursebyID = async function (id) {
  if (!dbconfig.db.pool) {
    throw new Error("Not connected to db");
  }

  let request = dbconfig.db.pool.request();
  let result = await request
    .input(
      TreatmentCSchema.schema.id.name,
      TreatmentCSchema.schema.id.sqlType,
      id
    )
    .query(
      `select * from ${TreatmentCSchema.schemaName} where ${TreatmentCSchema.schema.id.name} = @${TreatmentCSchema.schema.id.name}`
    );
  let course = result.recordsets[0][0];
  // console.log(result);
  return course;
};

exports.getCourseByName = async (name) => {
  if (!dbconfig.db.pool) {
    throw new Error("Not connected to db");
  }
  let request = dbconfig.db.pool.request();
  let result = await request
    .input(
      TreatmentCSchema.schema.name.name,
      TreatmentCSchema.schema.name.sqlType,
      name
    )
    .query(
      `select * from ${TreatmentCSchema.schemaName} where ${TreatmentCSchema.schema.name.name} = @${TreatmentCSchema.schema.name.name}`
    );
  // console.log(result);
  return result.recordsets[0][0];
};

exports.deleteCourseById = async (id) => {
  if (!dbconfig.db.pool) {
    throw new Error("Not connected to db");
  }
  let request = dbconfig.db.pool.request();
  let result = await request
    .input(
      TreatmentCSchema.schema.id.name,
      TreatmentCSchema.schema.id.sqlType,
      id
    )
    .query(
      `delete ${TreatmentCSchema.schemaName} where ${TreatmentCSchema.schema.id.name} = @${TreatmentCSchema.schema.id.name}`
    );

  // console.log(result);
  return result.recordsets;
};

exports.updateCourseById = async (id, updateInfo) => {
  // update Tours
  // set  name = 'Tours 3',
  //     price = 200,
  //     rating = 4.5
  // where Id = 2
  if (!dbconfig.db.pool) {
    throw new Error("Not connected to db");
  }
  if (!updateInfo) {
    throw new Error("Invalid input param");
  }
  let query = `update ${TreatmentCSchema.schemaName} set`;
  // 'update Tour set name = @name, ratingsAverage = @ratingsAverage, price = @price where id = @id';

  const { request, updateStr } = dbUtils.getUpdateQuery(
    TreatmentCSchema.schema,
    dbconfig.db.pool.request(),
    updateInfo
  );
  if (!updateStr) {
    throw new Error("Invalid update param");
  }
  request.input(
    TreatmentCSchema.schema.id.name,
    TreatmentCSchema.schema.id.sqlType,
    id
  );
  query +=
    " " +
    updateStr +
    ` where ${TreatmentCSchema.schema.id.name} = @${TreatmentCSchema.schema.id.name}`;
  console.log(query);
  let result = await request.query(query);
  // console.log(result);
  return result.recordsets;
};

exports.createCourse = async function (course) {
  if (!dbconfig.db.pool) {
    throw new Error("Not connected to db");
  }
  if (!course) {
    throw new Error("Invalid input param");
  }
  let now = new Date();
  course.createAt = now.toISOString();
  let insertdata = TreatmentCSchema.validateData(course);
  let query = `insert into ${TreatmentCSchema.schemaName}`;
  const { request, insertFieldNamesStr, insertValuesStr } =
    dbUtils.getInsertQuery(
      TreatmentCSchema.schema,
      dbconfig.db.pool.request(),
      insertdata
    );
  if (!insertFieldNamesStr || !insertValuesStr) {
    throw new Error("Invalid insert param");
  }

  query +=
    " (" +
    insertFieldNamesStr +
    ") select " +
    insertValuesStr +
    ` WHERE NOT EXISTS(SELECT * FROM ${TreatmentCSchema.schemaName} WHERE name = @name)` +
    ` SET IDENTITY_INSERT ${TreatmentCSchema.schemaName} OFF`;
  // console.log(query);
  let result = await request.query(query);
  return result.recordsets;
};

exports.addCourseIfNotExisted = async (tour) => {
  if (!dbconfig.db.pool) {
    throw new Error("Not connected to db");
  }
  let now = new Date();
  tour.createdAt = now.toISOString();
  let insertData = TreatmentCSchema.validateData(tour);

  let query = `SET IDENTITY_INSERT ${TreatmentCSchema.schemaName} ON insert into ${TreatmentCSchema.schemaName}`;

  const { request, insertFieldNamesStr, insertValuesStr } =
    dbUtils.getInsertQuery(
      TreatmentCSchema.schema,
      dbconfig.db.pool.request(),
      insertData
    );
  if (!insertFieldNamesStr || !insertValuesStr) {
    throw new Error("Invalid insert param");
  }

  query +=
    " (" +
    insertFieldNamesStr +
    ") select " +
    insertValuesStr +
    ` WHERE NOT EXISTS(SELECT * FROM ${TreatmentCSchema.schemaName} WHERE name = @name)` +
    ` SET IDENTITY_INSERT ${TreatmentCSchema.schemaName} OFF`;
  // console.log(query);

  let result = await request.query(query);

  // console.log(result);
  return result.recordsets;
};

exports.clearAll = async () => {
  if (!dbconfig.db.pool) {
    throw new Error("Not connected to db");
  }
  let result = await dbconfig.db.pool
    .request()
    .query(`delete ${TreatmentCSchema.schemaName}`);
  // console.log(result);
  return result.recordsets;
};
