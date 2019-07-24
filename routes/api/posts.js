const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post Model
const Post = require("../../models/Post");

// Profile model
const Profile = require("../../models/Profile");

// Load validPostInput
const validPostInput = require("../../validation/post");

//Laod valid comment input
const validCommentInput = require("../../validation/comment.js");

//@route GET api/posts/test
//@desc  Test posts route
//access Public
router.get("/test", (req, res) => res.json({ msg: "Posts works" }));

//@route GET api/posts
//@desc  GET post route
//access Public
router.get("/", (req, res) => {
  const errors = {};

  errors.noPost = "No posts found";
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.status(404));
});

//@route GET api/posts/:id
//@desc  GET post route
//access Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      res.json(post);
    })
    .catch(err => res.json({ nopost: "No post found with that ID" }));
});

//@route Post api/posts
//@desc  Create post
//access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validPostInput(req.body);

    // Check Validation
    if (!isValid) {
      // if any errors, send 400 with json object
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

//@route DELETE api/posts/:id
//@desc  DELETE post
//access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //   Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.json({ nopostfound: "No post found" }));
    });
  }
);
//@route POST api/posts/like/:id
//@desc  Like post
//access Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //   Check for post owner
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }
          // Adduser id to likes array
          post.likes.unshift({ user: req.user.id });

          // Save to database
          post.save().then(post => res.json(post));
        })
        .catch(err => res.json({ nopostfound: "No post found" }));
    });
  }
);

//@route POST api/posts/unlike/:id
//@desc  UNLIKE post
//access Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //   Check for post owner
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have yet liked this post" });
          }
          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice from the array
          post.likes.splice(removeIndex, 1);

          // Save to database
          post.save().then(post => res.json(post));
        })
        .catch(err => res.json({ nopostfound: "No post found" }));
    });
  }
);

//@route POST api/posts/comment/:id
//@desc  Comment on a post
//access Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validCommentInput(req.body);

    // Check Validation
    if (!isValid) {
      // if any errors, send 400 with json object
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id).then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        date: req.body.date,
        user: req.user.id
      };

      //   Add comment to array
      post.comments.unshift(newComment);

      // Save to database
      post.save().then(comment => res.json(comment));
    });
  }
);

//@route POST api/posts/comment/:id/:comment_id
//@desc  DELETE comment
//access Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexist: "The comment does not exist" });
        }

        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice out of array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
  }
);
module.exports = router;
