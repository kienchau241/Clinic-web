const AppointmentDAO = require("../DAO/AppointmentDAO");
const app = require("../app");

// CRUD OPERANTIONS
// R stands for READ (GET) APPOINTMENT
exports.getAllAppointment = async (req, res) => {
  try {
    console.log("gets All Appointment");
    const { page, pageSize, totalPage, totalItem, Appointment } =
      await AppointmentDAO.GetAllApp(req.query);
    console.log(req.quire);
    res.status(200).json({
      code: 200,
      msg: "OK",
      page,
      pageSize,
      totalPage,
      totalItem,
      data: {
        Appointment,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      code: 500,
      msg: e.toString(),
    });
  }
};

// R stands for READ (GET) APPOINTMENT "BY ID"
exports.checkIDappointment = async (req, res, next, val) => {
  try {
    const id = val;
    let appointment = await AppointmentDAO.getAppByID(id);
    if (!appointment) {
      return res.status(404).json({
        code: 404,
        msg: `Not found appointment with id ${id}`,
      });
    }
    req.appointment = appointment;
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      code: 500,
      msg: e.toString(),
    });
  }
  next();
};

exports.getAppointmentById = async (req, res) => {
  try {
    const Appointment = req.Appointment;
    res.status(200).json({
      code: 200,
      msg: "OK",
      data: {
        Appointment,
      },
    });
  } catch (e) {
    console.error(e);
    return res
      .status(500) // 500 - Internal Error
      .json({
        code: 500,
        msg: e.toString(),
      });
  }
};

// C stands for CREATE APPOINTMENT
exports.createAppointment = async (req, res) => {
  const newAppointment = req.body;
  try {
    await AppointmentDAO.createNewApp(newAppointment);
    let Appointment = await AppointmentDAO.getAppByID;
    Appointment = await AppointmentDAO.getAppByID(Appointment.id);
    return res.status(201).json({
      code: 201,
      msg: "New Appointment has just created",
      data: {
        Appointment,
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

// U stands for UPDATE APPOINTMENT BY ID
exports.updateAppointment = async (req, res) => {
  try {
    const id = req.params.id * 1;
    const updateInfo = req.body;
    await AppointmentDAO.updateAppByID(id, updateInfo);
    const Appointment = await AppointmentDAO.getAppByID(id);
    console.log(req.body);
    return res.status(200).json({
      code: 200,
      msg: `The Appointment Information with id ${id} has just updated!`,
      data: {
        Appointment,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      code: 500,
      msg: e.toString(),
    });
  }
};

// D stands for DELETE APPOINTMENT BY ID
exports.deleteAppointment = async (req, res) => {
  try {
    const id = req.params.id * 1;
    await AppointmentDAO.deleteAppByID(id);
    return res.status(200).json({
      code: 200,
      msg: `The Appointment Information with id ${id} has just deleted!`,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      code: 500,
      msg: e.toString(),
    });
  }
};
