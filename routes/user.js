const router = require("express").Router();
const isAuthenticated = require("../middlewares/jwt.middleware");
const User = require("./user");

router.get(
  "/profile",
  isAuthenticated,
  async (req, res) => await res.render("user-profile")
);

module.exports = router;
