const { Schema, model } = require("mongoose");

const favoriteschema = new Schema(
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

module.exports = model("booking", favoriteschema);
