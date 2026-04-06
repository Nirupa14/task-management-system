const express = require("express");
const router = express.Router();

const {
  getTasks,
  updateTaskStatus
} = require("../controllers/employeeController");

router.get("/tasks/:employeeId", getTasks);
router.put("/task/:id", updateTaskStatus);

module.exports = router;