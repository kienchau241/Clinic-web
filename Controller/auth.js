const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserDAO = require("../DAO/UserDAO");
const StaticData = require("../utils/StaticData");
const signToken = (id, username) => {
  return jwt.sign(
    {
      id: id,
      username: username,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRED_IN }
  );
};

exports.loginShow = async (req, res) => {
  res.render("login");
};

exports.login = async (req, res) => {
  try {
    const form = req.body;
    console.log(form);
    //1. check if form is valid
    if (!form.password || !form.userName) {
      return res
        .status(403) // 403 - Forbidden
        .json({ code: 403, msg: `Invalid params` });
    }
    //2. check if user existed
    const user = await UserDAO.getUserByUserName(form.userName);
    if (!user) {
      return res
        .status(401) // 401 - Unauthorized
        .json({ code: 401, msg: `Invalid user - ${form.userName}` });
    }
    //3. check if password is valid
    const isValidPassword = await bcrypt.compare(form.password, user.password);
    if (!isValidPassword) {
      return res
        .status(401) // 401 - Unauthorized
        .json({ code: 401, msg: "Invalid authentication" });
    }
    //4. get JWT & response to use  //https://jwt.io/
    const token = signToken(user.id, user.userName);
    res.status(200).json({
      code: 200,
      msg: "OK",
      data: { token },
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

exports.signupShow = async (req, res) => {
  res.render("signup");
};

exports.signup = async (req, res) => {
  try {
    const form = req.body;
    if (form.password !== form.repeatpassword) {
      return res
        .status(403) // 403 - Forbidden
        .json({
          code: 403,
          msg: `Invalid password`,
        });
    }
    //TODO - check if username/email existed
    await UserDAO.addUser({
      userName: form.userName,
      email: form.email,
      role: StaticData.AUTH.Role.user,
      active: true,
      password: form.password,
    });
    const user = await UserDAO.getUserByUserName(form.userName);
    delete user.password;
    delete user.passwordAt;
    res.status(200).json({
      code: 200,
      msg: "success",
      data: { user },
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

//middle - check if request is from login user
exports.protect = async (req, res, next) => {
  try {
    // 1) Getting token from header "Authorization"
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTY3OTUzMzEwOSwiZXhwIjoxNjc5NTU0NzA5fQ.HZ7zIGlbU2dQjgCUDbBridcO-CATrGbjthnNH0X2w-M
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res
        .status(401) // 401 - Unauthorized
        .json({
          code: 401,
          msg: "You are not logged in! Please log in to get access.",
        });
    }
    // 2) Verification token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("payload:", payload);
    // 3) Check if user still exists
    const currentUser = await UserDAO.getUser(payload.id);
    if (!currentUser) {
      return res
        .status(401) // 401 - Unauthorized
        .json({ code: 401, msg: `Invalid authentication` });
    }
    req.user = currentUser;
  } catch (e) {
    console.error(e);
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

//roles [StaticData.AUTH.Role.admin, StaticData.AUTH.Role.leadGuide]
exports.restrictTo = (...roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403) // 403 - Forbidden
        .json({
          code: 403,
          msg: "You do not have permission to perform this action",
        });
    }
    next();
  };
};
