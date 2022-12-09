const Booking = require("../models/Favorites");
const isAuthenticated = require("../middlewares/jwt.middleware");
const router = require("express").Router();

router.get("/favorites", isAuthenticated, async (req, res, next) => {
  try {
    const favorites = await Booking.find({ user: req.payload.id }).populate(
      "car"
    );
    res.json(favorites);
  } catch (error) {
    next(error);
  }
});

router.delete("/favorites/:id", isAuthenticated, async (req, res, next) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
