const dbConfig = require("./../database/dbconfig");
const dbUtils = require("../utils/dbutils");
const DiseasesSchema = require("../Model/Diseases");
const StaticData = require("../utils/StaticData");
const { request } = require("express");
const { log } = require("handlebars");

exports.clearAll = async function () {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }

  let result = await dbConfig.db.pool
    .request()
    .query(`delete ${DiseasesSchema.schemaName}`);
  return result.recordsets;
};

exports.getAllDis = async (filter) => {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }
  let query = `SELECT * from ${DiseasesSchema.schemaName}`;
  let countQuery = `SELECT COUNT(DISTINCT ${DiseasesSchema.schema.idDis.name}) as totalItem from ${DiseasesSchema.schemaName}`;

  const page = filter.page * 1 || 1;
  let pageSize = filter.pageSize * 1 || StaticData.config.MAX_PAGE_SIZE;
  if (pageSize > StaticData.config.MAX_PAGE_SIZE) {
    pageSize = StaticData.config.MAX_PAGE_SIZE;
  }
  const { filterStr, paginationStr } = dbUtils.getFilterQuery(
    DiseasesSchema.schema,
    filter,
    page,
    pageSize,
    DiseasesSchema.defaultSort
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

  const diseases = result.recordsets[0];

  return {
    page,
    pageSize,
    totalPage,
    totalItem,
    diseases: diseases,
  };
};

exports.GetDisbyId = async function (id) {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }

  let result = await dbConfig.db.pool
    .request()
    .input(
      DiseasesSchema.schema.idDis.name,
      DiseasesSchema.schema.idDis.sqlType,
      id
    )
    .query(
      `SELECT * from ${DiseasesSchema.schemaName} where ${DiseasesSchema.schema.idDis.name} = @${DiseasesSchema.schema.idDis.name}`
    );

  if (result.recordsets[0].length > 0) {
    return result.recordsets[0][0];
  }
  return null;
};

exports.addDis = async function (disease) {
  if (!dbConfig.db.pool) {
    throw new Error("Not connect to db");
  }

  let now = new Date();
  disease.createdAt = now.toISOString();

  let insertdata = DiseasesSchema.validateData(disease);

  let query = `insert into ${DiseasesSchema.schemaName}`;

  const { request, insertFieldNamesStr, insertValuesStr } =
    dbUtils.getInsertQuery(
      DiseasesSchema.schema,
      dbConfig.db.pool.request(),
      insertdata
    );
  if (!insertFieldNamesStr || !insertValuesStr) {
    throw new Error("Invalid insert param");
  }
  query += " (" + insertFieldNamesStr + ") values (" + insertValuesStr + ")";
  console.log(query);

  let result = await request.query(query);
  return result.recordsets;
};

exports.updateDis = async function (id, updateDis) {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }
  if (!updateDis) {
    throw new Error("Invalid update param");
  }

  let query = `update ${DiseasesSchema.schemaName} set`;

  const { request, updateStr } = dbUtils.getUpdateQuery(
    DiseasesSchema.schema,
    dbConfig.db.pool.request(),
    updateDis
  );
  if (!updateStr) {
    throw new Error("Invalid update param");
  }

  request.input(
    DiseasesSchema.schema.idDis.name,
    DiseasesSchema.schema.idDis.sqlType,
    id
  );
  query +=
    " " +
    updateStr +
    ` where ${DiseasesSchema.schema.idDis.name} = @${DiseasesSchema.schema.idDis.name}`;

  // console.log(query);
  let result = await request.query(query);
  return result.recordsets;
};

exports.deleteDis = async function (id) {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }

  let result = await dbConfig.db.pool
    .request()
    .input(
      DiseasesSchema.schema.idDis.name,
      DiseasesSchema.schema.idDis.sqlType,
      id
    )
    .query(
      `delete ${DiseasesSchema.schemaName} where ${DiseasesSchema.schema.idDis.name} = @${DiseasesSchema.schema.idDis.name}`
    );
  return result.recordsets;
};

exports.GetDisbyName = async (name) => {
  if (!dbConfig.db.pool) {
    throw new Error("Not connect to db");
  }
  let request = dbConfig.db.pool.request();
  let result = await request
    .input(
      DiseasesSchema.schema.nameDis.name,
      DiseasesSchema.schema.nameDis.sqlType,
      name
    )
    .query(
      `select * from ${DiseasesSchema.schemaName} where ${DiseasesSchema.schema.nameDis.name} = @${DiseasesSchema.schema.nameDis.name}`
    );
  return result.recordsets[0][0];
};

exports.addDisIfNotExisted = async function (disease) {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }
  let now = new Date();
  tour.createdAt = now.toISOString();
  let insertData = TourSchema.validateData(disease);

  let query = `SET IDENTITY_INSERT ${DiseasesSchema.schemaName} ON insert into ${DiseasesSchema.schemaName}`;

  const { request, insertFieldNamesStr, insertValuesStr } =
    dbUtils.getInsertQuery(
      DiseasesSchema.schema,
      dbConfig.db.pool.request(),
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
    ` WHERE NOT EXISTS(SELECT * FROM ${DiseasesSchema.schemaName} WHERE name = @name)` +
    ` SET IDENTITY_INSERT ${DiseasesSchema.schemaName} OFF`;
  // console.log(query);

  let result = await request.query(query);

  // console.log(result);
  return result.recordsets;
};
