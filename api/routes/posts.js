const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../model/Post");
const Profile = require("../model/Profiles");

const validatePostInput = require("../validation/post");

const passportAuthenticate = passport.authenticate("jwt", { session: false });

// create post
router.post("/", passportAuthenticate, (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(404).json(errors);
  }
  const { text, name, avatar } = req.body;
  const newPost = new Post({
    text,
    avatar,
    name,
    user: req.user.id
  });

  newPost.save().then(post => res.json(post));
});

// get all posts
router.get("/", passportAuthenticate, (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json(err));
});

// get post by id
router.get("/:id", passportAuthenticate, (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json(err));
});

// delete single post
router.delete("/:id", passportAuthenticate, (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ UnAuthorized: "UnAuthorized" });
        }

        post.remove().then(res.json({ success: true }));
      })
      .catch(err => res.status(404).json(err));
  });
});

// add like post
router.post("/like/:id", passportAuthenticate, (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.like.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res.status(400).json({ message: "Already like" });
        }

        // add id to array
        post.like.unshift({ user: req.user.id });

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json(err));
  });
});

// unlike post
router.post("/unlike/:id", passportAuthenticate, (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.like.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ message: "You have not yet liked this post" });
        }

        // find index and remove
        const removeIndex = post.like
          .map(like => like.user.toString())
          .indexOf(req.user.id);

        post.like.splice(removeIndex, 1);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json(err));
  });
});

// add comment to post
router.post("/comment/:id", passportAuthenticate, (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(404).json(errors);
  }

  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };

      post.comment.unshift(newComment);

      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json(err));
});

// delete comment to post
router.delete("/comment/:id/:commentId", passportAuthenticate, (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (
        post.comment.filter(
          comment => comment._id.toString() === req.params.commentId
        ).length === 0
      ) {
        return res.status(404).json({ message: "not exist" });
      }

      const removeIndex = post.comment
        .map(item => item._id.toString())
        .indexOf(req.params.commentId);

      post.comment.splice(removeIndex, 1);
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
