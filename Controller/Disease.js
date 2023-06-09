const DisDAO = require("../DAO/DiseasesDAO");

exports.CheckDisbyId = async (req, res, next, val) => {
  try {
    const id = val;
    let Disease = await DisDAO.GetDisbyId(id);
    if (!Course) {
      return res.status(404).json({
        code: 404,
        msg: `Not found tour with id ${id}`,
      });
    }
    req.Disease = Disease;
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

exports.GetDisbyName = async (req, res) => {
  try {
    const name = req.params;
    console.log(name.slug);
    let disease = await DisDAO.GetDisbyName(name.slug);
    console.log(disease);
    return res.status(200).json({
      code: 200,
      msg: disease,
    });
  } catch (e) {
    return res.status(500).json({
      code: 500,
      msg: e.toString(),
    });
  }
};

exports.getAllDis = async (req, res) => {
  try {
    // console.log(req.query);
    const { page, pageSize, totalPage, totalItem, diseases } =
      await DisDAO.getAllDis(req.query);
    // res.status(200).json({
    //   //200 - OK
    //   code: 200,
    //   msg: "OK",
    //   page,
    //   pageSize,
    //   totalPage,
    //   totalItem,
    //   data: {
    //     diseases,
    //   },
    // });
    res.render("disease", { diseases });
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

exports.createShow = async (req, res) => {
  res.render("./diseases/createDis");
};

exports.addDis = async (req, res) => {
  const newDis = req.body;
  try {
    await DisDAO.addDis(newDis);
    let disease = await DisDAO.GetDisbyId;
    disease = await DisDAO.GetDisbyId(disease.idDis);
    // return res.status(200).json({
    //   code: 200,
    //   msg: "Create disease success",
    //   data: {
    //     disease,
    //   },
    // });
    res.redirect("/api/v1/disease");
  } catch (e) {
    console.log(e);
    res.status(500).json({
      code: 500,
      msg: e.toString(),
    });
  }
};

exports.StoreDis = async (req, res) => {
  const { page, pageSize, totalPage, totalItem, diseases } =
    await DisDAO.getAllDis(req.query);
  res.render("./diseases/storeDis", { diseases });
};

exports.editShow = async (req, res) => {
  const id = req.params.id * 1;
  const dis = await DisDAO.GetDisbyId(id);
  res.render("./diseases/EditDis", dis);
};

exports.updateCourse = async (req, res) => {
  try {
    const id = req.params.id * 1;
    const updateInfo = req.body;
    await DisDAO.updateDis(id, updateInfo);
    const disease = await DisDAO.GetDisbyId(id);
    console.log(req.body);
    // return res.status(200).json({
    //   code: 200,
    //   msg: `Update disease with id: ${id} successfully!`,
    //   data: {
    //     disease,
    //   },
    // });
    return res.redirect("./StoreDis");
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

exports.deleteDis = async (req, res) => {
  try {
    const id = req.params.id * 1;
    await DisDAO.deleteDis(id);
    // return res.status(200).json({
    //   cose: 200,
    //   msg: `Delete disease with id ${id} success`,
    // });
    return res.redirect('back')
  } catch (e) {
    return res.status(500).json({
      cose: 500,
      msg: e.toString(),
    });
  }
};

exports.getDisbyId = async (req, res) => {
  try {
    const id = req.params.id * 1;
    let disease = await DisDAO.GetDisbyId(id);
    console.log(disease);
    // return res.status(200).json({
    //   code: 200,
    //   msg: disease,
    // });
    return res.render("./diseases/detailDis", disease);
  } catch (e) {
    return res.status(500).json({
      code: 500,
      msg: e.toString(),
    });
  }
};
