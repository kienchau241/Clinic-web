const postDAO = require("../DAO/postDAO");

exports.checkID = async (req, res, next, val) => {
  try {
    const id = val;
    let post = await postDAO.getPostsbyId(id);
    if (!post) {
      return res
        .status(404) /// 404 - NOT FOUND!
        .json({
          code: 404,
          msg: `Not found post with id ${id}`,
        });
    }
    req.post = post;
  } catch (e) {
    console.error(e);
    return res
      .status(500) // 500 - Internal Error
      .json({
        code: 500,
        msg: e.toString(),
      });
  }
  next();
};

exports.storePost = async (req, res) => {
  const { page, pageSize, totalPage, totalItem, posts } =
    await postDAO.getAllPosts(req.query);
  res.render("./post/StorePost", { posts });
};

exports.getAllPosts = async (req, res, next) => {
  try {
    console.log(req.query);
    const { page, pageSize, totalPage, totalItem, posts } =
      await postDAO.getAllPosts(req.query);
    // res.status(200).json({
    //   //200 - OK
    //   code: 200,
    //   msg: "OK",
    //   page,
    //   pageSize,
    //   totalPage,
    //   totalItem,
    //   data: {
    //     posts,
    //   },
    // });
    res.render("post", { posts });
  } catch (e) {
    console.error(e);
    res
      .status(500) // 500 - Internal Error
      .json({
        code: 500,
        msg: e.toString(),
      });
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const id = req.params.id * 1;
    const post = await postDAO.getPostsbyId(id);
    // res.status(200).json({
    //   code: 200,
    //   msg: "OK",
    //   data:  post ,
    // });
    res.render("./post/detailPost", post);
  } catch (e) {
    console.error(e);
    res
      .status(500) // 500 - Internal Error
      .json({
        code: 500,
        msg: e.toString(),
      });
  }
};

exports.editShow = async (req, res) => {
  const id = req.params.id * 1;
  const post = await postDAO.getPostsbyId(id);
  res.render("./post/editPost", post);
};

exports.creatShow = async (req, res) => {
  res.render("./post/createPost");
};

exports.createPost = async (req, res, next) => {
  const newPost = req.body;
  newPost.UserId = newPost.UserId * 1;
  try {
    await postDAO.creatPost(newPost);
    // return res.status(200).json({
    //   code: 200,
    //   msg: `Create new post successfully!`,
    // });
    return res.redirect("/api/v1/post");
  } catch (e) {
    console.log(e);
    res.status(500).json({
      code: 500,
      msg: e.toString(),
    });
  }
};

exports.updatepost = async (req, res, next) => {
  try {
    const id = req.params.id * 1;
    const updatePost = req.body;
    updatePost.UserId = updatePost.UserId * 1;
    await postDAO.updatePost(id, updatePost);
    const post = await postDAO.getPostsbyId(id);
    // res.status(200).json({
    //   code: 200,
    //   msg: `Update post with id: ${id} successfully!`,
    //   data: {
    //     post,
    //   },
    // });
    res.redirect("/api/v1/post/storePost");
  } catch (e) {
    console.error(e);
    res
      .status(500) // 500 - Internal Error
      .json({
        code: 500,
        msg: e.toString(),
      });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const id = req.params.id * 1;
    await postDAO.deletePost(id);
    res.status(200).json({
      code: 200,
      msg: `Delete post with ${id} successfully!`,
    });
  } catch (e) {
    console.error(e);
    res
      .status(500) // 500 - Internal Error
      .json({
        code: 500,
        msg: e.toString(),
      });
  }
};
