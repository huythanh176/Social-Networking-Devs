const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const db = require("../config/keys").mongoURI;

const port = process.env.PORT || 5000;

const users = require("./routes/users");
const profiles = require("./routes/profiles");
const posts = require("./routes/posts");
const passport = require("passport");
const app = express();

// use body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("database connected"))
  .catch(err => console.log(err));

//use passport middleware
app.use(passport.initialize());

// passport config
require("../config/passport")(passport);

app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);

app.get("/", (req, res) => res.send("Hi"));

app.listen(port, () => console.log(`Server running on port ${port}`));
