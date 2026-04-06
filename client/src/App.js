import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminTasks from "./pages/AdminTasks"; // ✅ new page


import EmployeeLogin from "./pages/EmployeeLogin";
import EmployeeDashboard from "./pages/EmployeeDashboard";

function App() {
  return (
    <Router>
      <Routes>

        {/* Employee Routes */}
        <Route path="/" element={<EmployeeLogin />} /> {/* default */}
        <Route path="/login" element={<EmployeeLogin />} />
        
        <Route path="/employee" element={<EmployeeDashboard />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/tasks" element={<AdminTasks />} /> {/* ✅ new */}

      </Routes>
    </Router>
  );
}

export default App;