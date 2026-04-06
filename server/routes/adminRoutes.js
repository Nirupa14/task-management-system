const express = require("express");
const router = express.Router();

const {
  getEmployees,
  approveEmployee,
  assignTask
} = require("../controllers/adminController");

router.get("/employees", getEmployees);
router.put("/approve/:id", approveEmployee);
router.post("/assign-task", assignTask);

module.exports = router;