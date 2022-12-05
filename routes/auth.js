const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const isAuthenticated = require("../middlewares/jwt.middleware");
const User = require("../models/User.model");
const saltRounds = 10;

router.post("/signup", async (req, res, next) => {
  const { name, email, password } = req.body;
  if (email === "" || name === "" || password === "") {
    res
      .status(400)
      .json({ message: "I need some informations to work with here!" });
  }

  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      res
        .status(400)
        .json({ message: "There's another one of you, somewhere." });
      return;
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPass = bcrypt.hashSync(password, salt);

    const createdUser = await User.create({
      name,
      email,
      password: hashedPass,
    });

    const user = createdUser.toObject();
    delete user.password;
    // ! Sending the user as json to the client
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Sweet, sweet 500." });
  }
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (email === "" || password === "") {
    res
      .status(400)
      .json({ message: "I need some informations to work with here!" });
  }
  try {
    const foundUser = await User.findOne({ email });
    console.log(foundUser);
    if (!foundUser) {
      res.status(401).json({ message: "You're not yourself." });
      return;
    }
    const goodPass = bcrypt.compareSync(password, foundUser.password);
    console.log(goodPass);
    if (goodPass) {
      const user = foundUser.toObject();
      delete user.password;

      const authToken = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "2d",
      });
      console.log(authToken);

      //! Sending the authToken to the client !

      res.status(200).json({ authToken });
    } else {
      res.status(401).json("Can you check your typos ?");
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Oh noes ! Something went terribly wrong !" });
  }
});

router.get("/me", isAuthenticated, async (req, res, next) => {
  // console.log("req payload", req.payload);
  // await res.redirect("/profile");

  const user = await User.findById(req.payload.id).select("-password");
  res.status(200).json(user);
});

module.exports = router;
