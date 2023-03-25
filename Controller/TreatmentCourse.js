const TreatmentCourseDAO = require("../DAO/TreatmentCourseDAO");

// exports.checkTreatmentCourseById = async (req, res, next, val) => {
//     try {
//         const id = val;
//         let Course = await TreatmentCourseDAO.get
//     } catch(e){

//     }
// }

exports.getAllCourses = async (res, req) => {
  try {
    const { page, pageSize, totalPage, totalItem, TreatmentCourses } =
      await TreatmentCourseDAO.getallCourse(req, query);
    res.status(200).json({
      code: 200,
      msg: "Ok",
      page,
      pageSize,
      totalPage,
      totalItem,
      data: { TreatmentCourses },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      code: 500,
      msg: e.toString(),
    });
  }
};