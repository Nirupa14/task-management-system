import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [employees, setEmployees] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/employees");
      setEmployees(res.data.employees || []);
    } catch (err) {
      console.log(err);
    }
  };

  const approveEmployee = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/approve/${id}`);
      alert("Employee Approved");
      fetchEmployees();
    } catch (err) {
      console.log(err);
    }
  };

  const assignTask = async () => {
    if (!selectedEmployee || !title || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/admin/assign-task", {
        title,
        description,
        assignedTo: selectedEmployee
      });

      alert("Task Assigned");

      setTitle("");
      setDescription("");
      setSelectedEmployee("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Dashboard</h2>

      <div style={styles.wrapper}>
        
        <button style={styles.viewBtn} onClick={() => navigate("/admin/tasks")}>
          View All Tasks
        </button>

        <h3 style={styles.subHeading}>Employees</h3>

        {employees.length === 0 ? (
          <p style={{ color: "#fff" }}>No employees found</p>
        ) : (
          employees.map((emp) => (
            <div key={emp._id} style={styles.card}>
              <p><b>Name:</b> {emp.name}</p>
              <p><b>Email:</b> {emp.email}</p>

              <p>
                <b>Status:</b>{" "}
                <span style={{
                  color: emp.isApproved ? "green" : "red"
                }}>
                  {emp.isApproved ? "Approved" : "Pending"}
                </span>
              </p>

              {!emp.isApproved && (
                <button
                  style={styles.approveBtn}
                  onClick={() => approveEmployee(emp._id)}
                >
                  Approve
                </button>
              )}
            </div>
          ))
        )}

        {/* Assign Task */}
        <div style={styles.card}>
          <h3>Assign Task</h3>

          <select
            style={styles.input}
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>

          <input
            style={styles.input}
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button style={styles.assignBtn} onClick={assignTask}>
            Assign Task
          </button>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #4facfe, #00f2fe)",
    padding: "20px"
  },
  heading: {
    textAlign: "center",
    color: "#fff",
    marginBottom: "20px"
  },
  subHeading: {
    color: "#fff"
  },
  wrapper: {
    maxWidth: "900px",
    margin: "auto"
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    margin: "15px 0",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  viewBtn: {
    background: "#28a745",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "15px"
  },
  approveBtn: {
    background: "#007bff",
    color: "#fff",
    padding: "6px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  assignBtn: {
    width: "100%",
    padding: "10px",
    background: "#4facfe",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default AdminDashboard;