const Task = require("../models/Task");

// Get tasks for employee
exports.getTasks = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const tasks = await Task.find({ assignedTo: employeeId });

    res.json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update task status
exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await Task.findByIdAndUpdate(id, { status });

    res.json({ message: "Task updated" });
  } catch (err) {
    res.status(500).json(err);
  }
};