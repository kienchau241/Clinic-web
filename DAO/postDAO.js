const dbConfig = require("../database/dbconfig");
const dbUtils = require("../utils/dbutils");
const postSchema = require("../Model/post");
const StaticData = require("../utils/StaticData");

exports.getAllPosts = async function (filter) {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }

  let query = `SELECT * from ${postSchema.schemaName}`;
  let countQuery = `SELECT COUNT(DISTINCT ${postSchema.schema.id.name}) as totalItem from ${postSchema.schemaName}`;

  const page = filter.page * 1 || 1;
  let pageSize = filter.pageSize * 1 || StaticData.config.MAX_PAGE_SIZE;
  if (pageSize > StaticData.config.MAX_PAGE_SIZE) {
    pageSize = StaticData.config.MAX_PAGE_SIZE;
  }

  const { filterStr, paginationStr } = dbUtils.getFilterQuery(
    postSchema.schema,
    filter,
    page,
    pageSize,
    postSchema.defaultSort
  );
  if (filterStr) {
    query += " " + filterStr;
    countQuery += " " + filterStr;
  }

  if (paginationStr) {
    query += " " + paginationStr;
  }
  // console.log(query);
  let result = await dbConfig.db.pool.request().query(query);
  let countResult = await dbConfig.db.pool.request().query(countQuery);

  let totalItem = 0;
  if (countResult.recordsets[0].length > 0) {
    totalItem = countResult.recordsets[0][0].totalItem;
  }
  let totalPage = Math.ceil(totalItem / pageSize); //round up
  return {
    page,
    pageSize,
    totalPage,
    totalItem,
    posts: result.recordsets[0],
  };
};

exports.getPostsbyId = async function (id) {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }
  let result = await dbConfig.db.pool
    .request()
    .input(postSchema.schema.id.name, postSchema.schema.id.sqlType, id)
    .query(
      `SELECT * from ${postSchema.schemaName} where ${postSchema.schema.id.name} = @${postSchema.schema.id.name}`
    );

  if (result.recordsets[0].length > 0) {
    return result.recordsets[0][0];
  }
  return null;
};

exports.creatPost = async function (post) {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }

  let now = new Date();
  post.createdAt = now.toISOString();

  let insertData = postSchema.validateData(post);

  // console.log(insertData);
  let query = `insert into ${postSchema.schemaName}`;

  const { request, insertFieldNamesStr, insertValuesStr } =
    dbUtils.getInsertQuery(
      postSchema.schema,
      dbConfig.db.pool.request(),
      insertData
    );
  if (!insertFieldNamesStr || !insertValuesStr) {
    throw new Error("Invalid insert param");
  }

  query += " (" + insertFieldNamesStr + ") values (" + insertValuesStr + ")";
  console.log(query);

  let result = await request.query(query);
  return result.recordsets;
};

exports.updatePost = async function (id, updatePost) {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }

  if (!updatePost) {
    throw new Error("Invalid update param");
  }

  let query = `update ${postSchema.schemaName} set`;

  const { request, updateStr } = dbUtils.getUpdateQuery(
    postSchema.schema,
    dbConfig.db.pool.request(),
    updateReview
  );
  if (!updateStr) {
    throw new Error("Invalid update param");
  }

  request.input(postSchema.schema.id.name, postSchema.schema.id.sqlType, id);
  query +=
    " " +
    updateStr +
    ` where ${postSchema.schema.id.name} = @${postSchema.schema.id.name}`;

  // console.log(query);
  let result = await request.query(query);
  return result.recordsets;
};

exports.deletePost = async function (id) {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }

  let result = await dbConfig.db.pool
    .request()
    .input(postSchema.schema.id.name, postSchema.schema.id.sqlType, id)
    .query(
      `delete ${postSchema.schemaName} where ${postSchema.schema.id.name} = @${postSchema.schema.id.name}`
    );

  return result.recordsets;
};

exports.addPostIfNotExisted = async function (review) {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }

  review.createdAt = new Date().toISOString();

  let insertData = ReviewSchema.validateData(review);

  let query = `SET IDENTITY_INSERT ${postSchema.schemaName} ON insert into ${postSchema.schemaName}`;

  const { request, insertFieldNamesStr, insertValuesStr } =
    dbUtils.getInsertQuery(
      postSchema.schema,
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
    ` WHERE NOT EXISTS(SELECT * FROM ${postSchema.schemaName} WHERE ${postSchema.schema.id.name} = @${postSchema.schema.id.name})`;
  // console.log(query);

  let result = await request.query(query);
  return result.recordsets;
};
