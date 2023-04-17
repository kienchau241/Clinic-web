const AppointmentDAO = require("../DAO/AppointmentDAO");

exports.checkAppointmentById = async (req, res, next, val) => {
  try {
    const id = val;
    let Appointment = await AppointmentDAO.getAppointmentById(id);
    if (!Appointment) {
      return res.status(404).json({
        code: 404,
        msg: `Not found tour with id ${id}`,
      });
    }
    req.Appointment = Appointment;
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
