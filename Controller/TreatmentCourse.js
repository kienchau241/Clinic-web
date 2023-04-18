const TreatmentCourseDAO = require("../DAO/TreatmentCourseDAO");

exports.checkTreatmentCourseById = async (req, res, next, val) => {
  try {
    const id = val;
    let Course = await TreatmentCourseDAO.getCoursebyID(id);
    if (!Course) {
      return res.status(404).json({
        code: 404,
        msg: `Not found tour with id ${id}`,
      });
    }
    req.Course = Course;
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

//CRUD operation
exports.getAllCourses = async (req, res) => {
  try {
    console.log("getAllCourses");
    const { page, pageSize, totalPage, totalItem, TreatmentCourses } =
      await TreatmentCourseDAO.getallCourse(req.query);
    console.log(req.query);
    // res.status(200).json({
    //   code: 200,
    //   msg: "Ok",
    //   page,
    //   pageSize,
    //   totalPage,
    //   totalItem,
    //   data: { TreatmentCourses },
    // });
    res.render("course", { TreatmentCourses });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      code: 500,
      msg: e.toString(),
    });
  }
};

exports.createShow = async (req, res) => {
  res.render("./TreatmentCourse/createCourse");
};

exports.createCourse = async (req, res) => {
  const newcourse = req.body;
  try {
    await TreatmentCourseDAO.createCourse(newcourse);
    let course = await TreatmentCourseDAO.getCoursebyID;
    course = await TreatmentCourseDAO.getCoursebyID(course.id);
    return res.status(200).json({
      code: 200,
      msg: "Create course success",
      data: {
        course,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      code: 500,
      msg: e.toString(),
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const id = req.params.id * 1;
    const updateInfo = req.body;
    await TreatmentCourseDAO.updateCourseById(id, updateInfo);
    const course = await TreatmentCourseDAO.getCoursebyID(id);
    console.log(req.body);
    return res.status(200).json({
      code: 200,
      msg: `Update course with id: ${id} successfully!`,
      data: {
        course,
      },
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

exports.deleteCourse = async (req, res) => {
  try {
    const id = req.params.id * 1;
    await TreatmentCourseDAO.deleteCourseById(id);
    return res.status(200).json({
      cose: 200,
      msg: `Delete course with id ${id} success`,
    });
  } catch (e) {
    return res.status(500).json({
      cose: 500,
      msg: e.toString(),
    });
  }
};

exports.getCoursebyID = async (req, res) => {
  try {
    const id = req.params.id * 1;
    const course = await TreatmentCourseDAO.getCoursebyID(id);
    // return res.status(200).json({
    //   code: 200,
    //   msg: "success",
    //   data: {
    //     course,
    //   },
    // });
    return res.render("./TreatmentCourse/detailCourse", course);
  } catch (e) {
    return res.status(500).json({
      code: 500,
      msg: e.toString(),
    });
  }
};

exports.getCoursebyName = async (req, res) => {
  try {
    const name = req.params.name;
    const course = await TreatmentCourseDAO.getCourseByName(name);
    return res.status(200).json({
      code: 200,
      msg: "success",
      data: {
        course,
      },
    });
  } catch (e) {
    return res.status(500).json({
      code: 500,
      msg: e.toString(),
    });
  }
};

// exports.getCourse = async (req, res) => {
//   try {
//     const slug = req.params.slug;
//     if (slug === Number) {
//       const id = req.params.id * 1;
//       const course = await TreatmentCourseDAO.getCoursebyID(id);
//       return res.status(200).json({
//         code: 200,
//         msg: "success",
//         data: {
//           course,
//         },
//       });
//     }
//     if (slug === String) {
//       const name = req.params.slug;
//       const course = await TreatmentCourseDAO.getCourseByName(name);
//       return res.status(200).json({
//         code: 200,
//         msg: "success",
//         data: {
//           course,
//         },
//       });
//     }
//   } catch (e) {}
// };
