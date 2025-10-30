// routes/data.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authz");
const UserData = require("../model/userData");

// 🟩 Get current user's data
router.get("/my", auth, async (req, res) => {
  try {
    const userData = await UserData.findOne({ userId: req.user.id });

    if (!userData) {
      return res.status(200).json({ message: "No data found", data: {} });
    }

    res.status(200).json({ data: userData });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🟦 Save or update user data
router.post("/save", auth, async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    let userData = await UserData.findOne({ userId });

    if (userData) {
      // Update existing
      userData = await UserData.findOneAndUpdate(
        { userId },
        { $set: data },
        { new: true, runValidators: true }
      );
      return res.status(200).json({ message: "Data updated successfully", data: userData });
    } else {
      // Create new
      const newData = new UserData({ userId, ...data });
      await newData.save();
      return res.status(201).json({ message: "Data saved successfully", data: newData });
    }
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🟥 Optional: Delete user data or section
router.delete("/delete", auth, async (req, res) => {
  try {
    const { section } = req.body;
    const userId = req.user.id;

    let userData = await UserData.findOne({ userId });
    if (!userData) return res.status(404).json({ message: "No data found" });

    if (section && userData[section]) {
      userData[section] = Array.isArray(userData[section]) ? [] : {};
      await userData.save();
      return res.json({ message: `${section} cleared successfully` });
    } else {
      await UserData.deleteOne({ userId });
      return res.json({ message: "All data deleted successfully" });
    }
  } catch (err) {
    console.error("Error deleting data:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
