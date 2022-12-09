const { Schema, model } = require("mongoose");

const favoriteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: "Car",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Booking", favoriteSchema);
