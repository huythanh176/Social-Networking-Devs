const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");

const Profile = require("../model/Profiles");
const User = require("../model/User");
const passport = require("passport");

const passportAuthenticate = passport.authenticate("jwt", { session: false });

router.get("/current", passportAuthenticate, (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id }).then(profile => {
    if (!profile) {
      errors.noProfile = "There is no profile for this user";
      return res.status(404).json(errors);
    }
    res.json(profile);
  });
});
module.exports = router;
