import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminTasks() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/employees");
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>All Assigned Tasks</h2>

      <div style={styles.wrapper}>

        <button style={styles.backBtn} onClick={() => navigate("/admin/dashboard")}>
          ← Back to Dashboard
        </button>

        {tasks.length === 0 ? (
          <p style={{ color: "#fff" }}>No tasks found</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} style={styles.card}>
              <p><b>Employee:</b> {task.assignedTo?.name}</p>
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
  backBtn: {
    background: "#007bff",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "15px"
  }
};

export default AdminTasks;