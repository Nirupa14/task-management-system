import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function EmployeeDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state || {};

  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async () => {
    try {
      if (!user._id) return;

      const res = await axios.get(
        `http://localhost:5000/api/employee/tasks/${user._id}`
      );
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [user._id]);

  const updateStatus = async (taskId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/employee/task/${taskId}`,
        { status }
      );
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (!user._id) {
    return <h2>Please login first</h2>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Employee Dashboard</h2>

      <div style={styles.wrapper}>

        <button style={styles.logoutBtn} onClick={() => navigate("/login")}>
          Logout
        </button>

        {tasks.length === 0 ? (
          <p style={{ color: "#fff" }}>No tasks assigned</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} style={styles.card}>
              <p><b>Title:</b> {task.title}</p>
              <p><b>Description:</b> {task.description}</p>

              <p>
                <b>Status:</b>{" "}
                <span style={{
                  color:
                    task.status === "Completed"
                      ? "green"
                      : task.status === "In Progress"
                      ? "orange"
                      : "red"
                }}>
                  {task.status}
                </span>
              </p>

              <select
                style={styles.select}
                value={task.status}
                onChange={(e) =>
                  updateStatus(task._id, e.target.value)
                }
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          ))
        )}

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
  wrapper: {
    maxWidth: "800px",
    margin: "auto"
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    margin: "15px 0",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
  },
  select: {
    marginTop: "10px",
    padding: "8px",
    borderRadius: "5px"
  },
  logoutBtn: {
    background: "#dc3545",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "15px"
  }
};

export default EmployeeDashboard;