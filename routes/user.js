const express = require("express");
const router = express.Router();

//import pour mdp
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../models/User");

router.post("/signup", async (req, res) => {
  try {
    const { username, password, description, email } = req.body;

    if (!username || !password || !description || !email) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    const userEmail = await User.findOne({ email: email }); // null ou alors un user
    const userUsername = await User.findOne({ username: username }); // null ou { user }

    if (userEmail || userUsername) {
      return res.status(400).json({ error: "User already in DB" });
    }

    // cryptage !
    const salt = uid2(16); // string aléatoire de 16
    const hash = SHA256(password + salt).toString(encBase64);
    const token = uid2(16);

    const newUser = new User({
      username,
      email,
      description,
      hash,
      salt,
      token,
    });

    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      username: newUser.username,
      description: newUser.description,
      token: newUser.token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", (req, res) => {
  res.send("login");
});

module.exports = router;
