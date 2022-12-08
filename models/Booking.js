const { Schema, model } = require("mongoose");

const bookingSchema = new Schema(
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

module.exports = model("booking", bookingSchema);
