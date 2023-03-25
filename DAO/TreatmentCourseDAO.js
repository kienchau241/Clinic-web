const dbUtils = require("../utils/dbutils");
const StaticData = require("../utils/StaticData");
const dbconfig = require("../database/dbconfig");

const TreatmentCSchema = require("../Model/TreatmentCourse");

exports.getallCourse = async function (filter) {
  if (!dbconfig.db.pool) {
    throw new Error("Not connected to db");
  }

  let query = `select * from ${TreatmentCSchema.schema}`;
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
  // console.log(query);
  const result = await dbConfig.db.pool.request().query(query);
  let countResult = await dbConfig.db.pool.request().query(countQuery);

  let totalItem = 0;
  if (countResult.recordsets[0].length > 0) {
    totalItem = countResult.recordsets[0][0].totalItem;
  }
  let totalPage = Math.ceil(totalItem / pageSize); //round up

  const TreatmentCourses = result.recordsets[0];
  for (let i = 0; i < TreatmentCourses.length; i++) {
    const TreatmentCourse = TreatmentCourses[i];
    await setTourInfo(TreatmentCourse);
  }

  return {
    page,
    pageSize,
    totalPage,
    totalItem,
    TreatmentCourses: TreatmentCourses,
  };
};
