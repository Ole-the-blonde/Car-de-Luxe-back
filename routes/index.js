const router = require("express").Router();
const protectRoute = require("../middlewares/protectRoute");

router.get("/", (req, res, next) => {
  res.send("Server is running... 🏃‍♂️");
});
router.use("/user", require("./user"));

router.use(require("./cars"));

router.get("/private", protectRoute, (req, res, next) => {
  res.send("Protection passed !");
});

module.exports = router;
