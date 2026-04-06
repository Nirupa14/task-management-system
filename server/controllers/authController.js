const Employee = require("../models/Employee");

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = new Employee({ name, email, password });
    await user.save();

    res.json({ message: "Registered successfully, wait for admin approval" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Employee.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isApproved) {
      return res.status(403).json({ message: "Waiting for admin approval" });
    }

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json(err);
  }
};