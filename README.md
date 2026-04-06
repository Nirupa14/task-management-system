Admin and Employee Task Management System

This project is a full-stack web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). It is designed to simulate a real-world task management system where an administrator manages employee access and assigns tasks, while employees can track and update their work progress.

The application follows a role-based workflow where the administrator has complete control over employee approvals and task assignments, and employees interact with the system only after being approved.

Overview

The system consists of two main modules: the Admin Portal and the Employee Portal.

In the Admin Portal, the administrator logs in using predefined credentials. Once logged in, the admin can view all employee registrations, approve or reject employees, and assign tasks. The admin can also view all assigned tasks along with their current status, which helps in tracking employee performance and progress.

In the Employee Portal, users must first register by providing basic details. However, login access is granted only after admin approval. Once approved, employees can log in, view their assigned tasks, and update the task status as Pending, In Progress, or Completed.

Key Features

Admin Module
- Secure admin login with predefined credentials
- View all registered employees
- Approve employee access
- Assign tasks with title and description
- View all tasks along with assigned employee and status

Employee Module
- Registration and login functionality
- Login restricted until admin approval
- View assigned tasks
- Update task progress status dynamically

Technical Implementation

Frontend
The frontend is built using React.js with functional components and React Hooks such as useState, useEffect, and useCallback. Routing is handled using React Router. The UI is designed using inline styling with a consistent layout, gradient backgrounds, and card-based components for a modern appearance.

Backend
The backend is developed using Node.js and Express.js. RESTful APIs are created for authentication, employee management, and task operations. The server handles requests from the frontend and interacts with the database.

Database
MongoDB is used as the database to store employee and task data. Mongoose is used for schema modeling. Relationships between tasks and employees are managed using ObjectId references and populate functionality.

Project Structure

task-management-system/
client/    React frontend application
server/    Node.js and Express backend

The client folder contains all React components, pages, and UI logic. The server folder contains API routes, controllers, models, and database configuration.

Installation and Setup

1. Clone the repository
git clone https://github.com/Nirupa14/task-management-system.git

2. Navigate to server folder and install dependencies
cd server
npm install

3. Start the backend server
npm start

4. Navigate to client folder and install dependencies
cd client
npm install

5. Start the frontend application
npm start

The application will run on localhost with the frontend and backend communicating through API endpoints.

Admin Credentials

Email: admin@gmail.com  
Password: admin123

Working Flow

The system starts with employee registration. The admin logs in and approves employees. Once approved, employees can log in and view assigned tasks. The admin assigns tasks to specific employees, and employees update their task status. The admin can monitor all tasks and their progress from a dedicated dashboard.

Future Enhancements

- Implementation of JWT-based authentication for improved security
- Role-based authorization using tokens
- Search and filter functionality for employees and tasks
- Progress tracking using visual indicators
- Deployment using cloud platforms such as Render and Netlify

Conclusion

This project demonstrates a complete full-stack application with role-based access control, real-time task tracking, and a structured client-server architecture. It showcases practical implementation of MERN stack technologies and follows a scalable design approach suitable for real-world applications.

Author

Nirupa
