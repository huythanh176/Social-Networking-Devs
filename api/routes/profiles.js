const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");

const Profile = require("../model/Profiles");
const User = require("../model/User");
const passport = require("passport");

const validateProfileInput = require("../validation/profile");
const validateExperienceInput = require("../validation/experience");
const validateEducationInput = require("../validation/education");

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
    instagram
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
  if (instagram) profileField.social.instagramm = instagram;

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

// get all user profile
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find() // get all
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile for this user";
        return res.status(400).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// get profile by handle
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.handle = "There is no profile for this user";
        return res.status(400).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// get profile by user id
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ id: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.handle = "There is no profile for this user";
        return res.status(400).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// create experience of user
router.post("/experience", passportAuthenticate, (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body);

  if (!isValid) {
    return res.status(404).json(errors);
  }
  const { title, company, location, from, to, current, description } = req.body;
  Profile.findOne({ user: req.user.id }).then(profile => {
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    profile.experience.unshift(newExp); // element will insert at start of the array

    profile.save().then(profile => res.json(profile));
  });
});

// creat education of user
router.post("/education", passportAuthenticate, (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body);

  if (!isValid) {
    return res.status(404).json(errors);
  }
  const {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description
  } = req.body;
  Profile.findOne({ user: req.user.id }).then(profile => {
    const newExp = {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description
    };

    profile.education.unshift(newExp); // element will insert at start of the array

    profile.save().then(profile => res.json(profile));
  });
});

// delete experience of user
router.delete(
  "/experience/:experience_id",
  passportAuthenticate,
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.experience_id);

        //splice out of the array
        profile.experience.splice(removeIndex, 1);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// delete education by id
router.delete("/education/:education_id", passportAuthenticate, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.education_id);

      //splice out of the array
      profile.education.splice(removeIndex, 1);

      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// delete profile and user
router.delete("/", passportAuthenticate, (req, res) => {
  Profile.findOneAndRemove({ id: req.user.id })
    .then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    })
    .catch(err => res.status(404).json("Not found"));
});
module.exports = router;
