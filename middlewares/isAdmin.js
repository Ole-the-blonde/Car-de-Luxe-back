const UserModel = require("../models/User.model");

const isAdmin = async (req, res, next) => {
  const user = await UserModel.findById(req.payload.id);
  if (user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "You are not an admin" });
  }
};

module.exports = isAdmin;
