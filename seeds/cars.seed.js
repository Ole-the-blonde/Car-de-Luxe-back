const json = require("./data");
require("dotenv").config();
require("../config/dbConfig");
const mongoose = require("mongoose");
const Car = require("../models/Car.model");

async function seedDB() {
  try {
    await Car.deleteMany();
    await Car.create(json);
    await mongoose.disconnect();
  } catch (error) {
    console.log(error);
  }
}

seedDB();
