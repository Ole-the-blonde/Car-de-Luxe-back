require("dotenv").config();
require("./config/dbConfig");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const app = express();
const upload = require("./config/cloudinary");

//? Services like render use something called a proxy and you need to add this to your server
app.set("trust proxy", 1);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);

app.use("/api", require("./routes/index"));
app.use("/api/auth", require("./routes/auth"));
app.post("/upload", upload.single("myFile"), (req, res) => {
  res.json(req.file);
});

require("./error-handling/index")(app);

module.exports = app;
