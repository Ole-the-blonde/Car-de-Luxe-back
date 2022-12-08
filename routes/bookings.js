const Booking = require("../models/Booking");
const isAuthenticated = require("../middlewares/jwt.middleware");
const router = require("express").Router();

router.get("/bookings", isAuthenticated, async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.payload.id }).populate(
      "car"
    );
    res.json(bookings);
  } catch (error) {
    next(error);
  }
});

router.delete("/bookings/:id", isAuthenticated, async (req, res, next) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
