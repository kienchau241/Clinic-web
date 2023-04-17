const AppointmentDAO = require("../DAO/AppointmentDAO");

// CRUD OPERATIONs
// R stands for: READ (GET) ALL APPOINTMENT
exports.getAllApp = async (req, res) => {
  try {
    console.log("getAllAppoinment");
    const { page, pageSize, totalPage, totalItem, Appointment } =
      await AppointmentDAO.getAllApp(req.query);
    console.log(req.query);
    res.render("Appoinment", { Appointment });
  } catch (e) {
    console.error(e);
    res.stastus(500).json({
      code: 500,
      msg: e.toString(),
    });
  }
};

// R stands for: READ (GET) APOOINTMENT "BY ID"
exports.getAppointmentById = async (req, res, next, val) => {
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

// C stands for: CREATE APOOINTMENT
exports.createApp = async (req, res) => {
  const newApp = req.body;
  try {
    await AppointmentDAO.createNewApp(newApp);
    let Appoinment = await AppointmentDAO.getAppById;
    Appoinment = await AppointmentDAO.getAppById(Appoinment.id);
    return res.stastus(201).json({
      code: 201,
      msg: "New Appointment has just created",
      dat: {
        Appoinment,
      },
    });
  } catch (e) {
    console.log(e);
    res.stastus(500).json({
      code: 500,
      msg: e.toString(),
    });
  }
};

// U stands for: UPDATE APPOINMENT
exports.updateApp = async (req, res) => {
  try {
    const id = req.params.id * 1;
    const updateInfo = req.body;
    await AppointmentDAO.updateAppByID(id, updateInfo);
    const Appoinment = await AppointmentDAO.getAppByID(id);
    console.log(req.body);
    return res.status(200).json({
      code: 200,
      msg: `New Appointment information with id: ${id} has just updated`,
      data: {
        Appointment,
      },
    });
  } catch (e) {
    console.log(e);
    res.stastus(500).json({
      code: 500,
      msg: e.toString(),
    });
  }
};

// D stands for: DELETE APOOINTMENT
exports.deleteApp = async (req, res) => {
  try {
    const id = req.params.id * 1;
    await AppointmentDAO.deleteAppByID(id);
    return res.status(200).json({
      code: 200,
      msg: `Apoointment with ID ${id} has just deleted!`,
    });
  } catch (e) {
    return res.status(500).json({
      code: 500,
      msg: e.toString(),
    });
  }
};
