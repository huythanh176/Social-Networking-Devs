const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const keys = require("../../config/keys");
const passport = require("passport");

const app = express();

// load  input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

router.post("/register", (req, res) => {
  const { email, password, name } = req.body;

  const { errors, isValid } = validateRegisterInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email }).then(user => {
    if (user) {
      res.status(400).json({ email: "email already exist" });
    } else {
      const avatar = gravatar.url(email, {
        s: "200", // size
        r: "pg", //rating
        d: "mm" //Default
      });

      const newUser = new User({
        name,
        email,
        password,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const { errors, isValid } = validateLoginInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // find email exist
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.json(errors);
    }

    // compare password , hash password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // create payload JWT
        const payload = {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar
        };

        // sign token
        jwt.sign(
          payload,
          keys.secret,
          { expiresIn: 36000000 },
          (err, token) => {
            return res.json({ token: "Bearer " + token });
          }
        );
      } else {
        errors.password = "password is required";
        return res.json(errors);
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      email: req.user.email,
      name: req.user.name,
      avatar: req.user.avatar
    });
  }
);

module.exports = router;
