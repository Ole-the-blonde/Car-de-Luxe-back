const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    make: { type: String, required: true },
    image: { type: String, required: true },

    transmission: {
      type: String,
      enum: ["Automatic", "Manual"],
      required: true,
    },

    maxSpeed: { type: Number, required: true },
    power: { type: String, required: true },
    price: { type: Number, required: true },
    deposit: { type: Number },
    /* countInStock: { type: Number, required: true }, */

    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", carSchema);
module.exports = Car;
