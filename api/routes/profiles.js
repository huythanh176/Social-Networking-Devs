const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");

const Profile = require("../model/Profiles");
const User = require("../model/User");
const passport = require("passport");

const validateProfileInput = require("../validation/profile");

const passportAuthenticate = passport.authenticate("jwt", { session: false });

// get current user profile
router.get("/", passportAuthenticate, (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    .populate("user", ["name", "avatar"]) // add 2 fields from user Schema Profiles user
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(400).json(err));
});

// create new profile for user or Edit
router.post("/", passportAuthenticate, (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const profileField = {};
  profileField.user = req.user.id;

  const {
    handle,
    company,
    website,
    location,
    bio,
    status,
    githubUserName,
    skills,
    youtube,
    facebook,
    twitter,
    linkedin,
    instagramm
  } = req.body;

  if (handle) profileField.handle = handle;
  if (company) profileField.company = company;
  if (website) profileField.website = website;
  if (location) profileField.location = location;
  if (bio) profileField.bio = bio;
  if (status) profileField.status = status;
  if (githubUserName) profileField.githubUserName = githubUserName;
  // skills  - split to array
  if (skills) profileField.skills = skills.split(",");

  //social
  profileField.social = {};
  if (youtube) profileField.social.youtube = youtube;
  if (facebook) profileField.social.facebook = facebook;
  if (twitter) profileField.social.twitter = twitter;
  if (linkedin) profileField.social.linkedin = linkedin;
  if (instagramm) profileField.social.instagramm = instagramm;

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      //update
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileField },
        { new: true }
      ).then(profile => res.json(profile));
    } else {
      //check handle
      Profile.findOne({ handle: req.user.handle }).then(handle => {
        if (handle) {
          errors.handle = "That handle already exist";
          return res.status(400).json(errors);
        }

        // update
        new Profile(profileField).save().then(profile => res.json(profile));
      });
    }
  });
});
module.exports = router;
