const router = require("express").Router();
const protectRoute = require("../middlewares/protectRoute");
const Car = require("../models/Car.model");
const isAuthenticated = require("../middlewares/jwt.middleware");
const User = require("../models/User.model");
const isAdmin = require("./../middlewares/isAdmin");
const Booking = require("../models/Booking");

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

router.patch("/cars/:id", isAuthenticated, async (req, res, next) => {
  const data = { ...req.body };
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.status(200).json(updatedCar);
  } catch (error) {
    next(error);
  }
});

router.delete("/cars/:id", isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.post("/cars/:id/reserve", isAuthenticated, async (req, res, next) => {
  try {
    const booking = await Booking.create({
      user: req.payload.id,
      car: req.params.id,
    });
    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
});

router.post("/rentcar", isAuthenticated, async (req, res, next) => {
  const foundUser = await User.findById(req.payload.id); // code to find the Usser that is logged in
  console.log("the req.body", req.body);
  const {
    brand,
    make,
    image,
    transmission,
    maxSpeed,
    power,
    price,
    deposit,
    description,
  } = req.body;

  try {
    const newCar = await Car.create({
      brand,
      make,
      image,
      transmission,
      maxSpeed,
      power,
      price,
      deposit,
      description,
    });

    res.status(201).json(newCar);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
