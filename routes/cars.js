const router = require("express").Router();
const protectRoute = require("../middlewares/protectRoute");
const Car = require("../models/Car.model");

router.get("/cars", async (req, res) => {
  try {
    const cars = await Car.find();
    console.log(cars);
    res.json(cars);
  } catch (error) {
    next(error);
  }
});

router.get("/cars/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.json(car);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
