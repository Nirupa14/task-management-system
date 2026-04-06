const Employee = require("../models/Employee");
const Task = require("../models/Task");

// 🔥 Get all employees + tasks
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();

    // fetch all tasks and link employee data
    const tasks = await Task.find().populate("assignedTo");

    res.json({
      employees,
      tasks
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// ✅ Approve employee
exports.approveEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    await Employee.findByIdAndUpdate(id, { isApproved: true });

    res.json({ message: "Employee approved" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// ✅ Assign task
exports.assignTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    const task = new Task({
      title,
      description,
      assignedTo
    });

    await task.save();

    res.json({ message: "Task assigned" });
  } catch (err) {
    res.status(500).json(err);
  }
};