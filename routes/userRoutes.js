const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../utils/validators");

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, isSeller } = req.body;

    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      return res.status(403).json({ error: "User Exist" });
    }
    if (!validateName) {
      return res.status(400).json({ message: "Invalid Name" });
    }
    if (!validateEmail) {
      return res.status(400).json({ message: "Invalid Email" });
    }
    if (!validatePassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      isSeller,
      password: hashPassword,
    };
    const createdUser = await User.create(newUser);
    return res.status(201).json({ message: `User created successfully` });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email.length === 0) {
      return res.status(400).json({ err: "Please provide email" });
    }
    if (email.password === 0) {
      return res.status(400).json({ err: "Please provide password" });
    }
    const isUserExist = await User.findOne({ where: { email } });
    if (!isUserExist) {
      return res.status(404).json({ err: "User does not exist" });
    }
    const passwordMatch = await bcrypt.compare(password, isUserExist.password);
    if (!passwordMatch) {
      return res.status(400).json({ err: "email or password mismatched" });
    }
    const payload = {user: {id: isUserExist.id}}
    const bearerToken = await jwt.sign(payload, "SECRET MESSAGE", {
        expiresIn: 360000
    });
    res.cookie('t', bearerToken, {expire: new Date() + 9999})

    return res.status(200).json({
        isUserExist,
        bearerToken
    })
  } catch (error) {
    // console.log(">>>>", error)
    res.status(500).json({ message: error });
  }
});

router.get('/signout', async(req, res) => {
    try {
        // delete cookie from server;
        res.clearCookie('td');
        res.status(200).json({message: "Cookie deleted"})
    } catch (error) {
        res.status(500).json({err: error})
    }
})

module.exports = router;
