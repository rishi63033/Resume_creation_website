const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
require('dotenv').config();



    const signupSchema = z.object({
      username : z.string().min(3,"user must be 3 characters"),
      password : z.string().min(3,"password must be 6")
    })
// Signup route
router.post("/signup", async (req, res) => {
  try {
    const validatedData = signupSchema.parse(req.body);
    const { username, password } = validatedData;

    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors.map(e => e.message) });
    }
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

   const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, process.env.jwts, { expiresIn: process.env.JWT_EXPIRES_IN || "1d" });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
