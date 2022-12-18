const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
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
      res.status(403).json({ err: "User Exist" });
    }
    if (!validateName) {
      res.status(400).json({ message: "Invalid Name" });
    }
    if (!validateEmail) {
      res.status(400).json({ message: "Invalid Email" });
    }
    if (!validatePassword) {
      res.status(400).json({ message: "Invalid Password" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      isSeller,
      password: hashPassword,
    };
    const createdUser = await User.create(newUser);
    return res
      .status(201)
      .json({ status: "Success", message: `User created successfully` });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
