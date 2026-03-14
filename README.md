# HrManagic

## Project Overview

This project is a **lightweight Human Resource Management System (HrManagic)** built as a full-stack web application.
The application allows an admin to manage employees and track their daily attendance.

The system includes:

* Employee management
* Attendance tracking
* Calendar view for employee attendance
* Search and sorting features
* Inline editing
* Modern UI using TailwindCSS
* Toast notifications
* Progress indicator for API requests

The application is built with a **React frontend**, **Node.js + Express backend**, and **MongoDB database**.

---

# Tech Stack

### Frontend

* React (Vite)
* TailwindCSS
* Heroicons
* React Hot Toast

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Deployment

* Frontend → Vercel
* Backend → Render
* Database → MongoDB Atlas

---

# Project Structure

```
project-root
│
├── hrms-ui
│   ├── src
│   │   ├── components
│   │   │   ├── EmployeeList.jsx
│   │   │   ├── EmployeeForm.jsx
│   │   │   ├── AttendanceTable.jsx
│   │   │   ├── AttendanceModal.jsx
│   │   │   ├── DeleteConfirm.jsx
│   │   │   └── common
│   │   │        ├── Button.jsx
│   │   │        └── SearchInput.jsx
│   │   │
│   │   ├── services
│   │   │   └── api.js
│   │   │
│   │   └── main.jsx
│   │
│   └── package.json
│
├── hrms-api
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

# Features

## 1. Employee Management

Admin can:

* Add new employee
* Edit employee (inline editing)
* Delete employee with confirmation popup
* View employee list
* Search employees by **name or employee ID**
* Sort employee list by **ID or name** (Need to click on the Employee ID or Employee name in the Employee managament table)

Employee fields:

* Employee ID (generated from backend)
* Full Name
* Email
* Department

---

## 2. Attendance Management

Admin can:

* Mark attendance for employees
* Choose attendance date
* Mark **Present / Absent**
* Save attendance for all employees at once

Extra UI features:

* Present rows → green background
* Absent rows → red background
* Status indicator dots

  * 🟢 Present
  * 🔴 Absent

---

## 3. Attendance Calendar View

Each employee has a **View Attendance** button.

This opens a calendar modal where admin can:

* See monthly attendance
* Toggle dates between present and absent
* Save attendance updates

Calendar also shows:

* Total days
* Total present
* Total absent
* Attendance percentage

---

# UI Improvements Implemented

The UI includes several improvements:

* TailwindCSS styling
* Reusable components
* Toast notifications instead of alerts
* Modal dialogs for forms
* Inline editing for employees
* Sticky table headers
* Scrollable tables
* Fixed layout cards
* Loading states
* Search input component
* Reusable Button component
* Spinner or disabled state during API calls
* Progress bar indicator during API requests

Tables have:

* Fixed card height
* Scrollable body
* Sticky headers

---

# Reusable Components

### Button Component

Used across the application to keep button styles consistent.

Supports variants:

* primary
* secondary
* danger
* success

Example:

```
<Button variant="primary">Save</Button>
```

---

### SearchInput Component

Reusable search input used in:

* Employee list
* Attendance table

Example:

```
<SearchInput
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search by name or ID"
/>
```

---

# API Endpoints

### Employees

```
GET    /employees
POST   /employees
PUT    /employees/:id
DELETE /employees/:id
```

---

### Attendance

```
POST /attendance/bulk
GET  /attendance/date?date=YYYY-MM-DD
```

---

# Local Setup

## 1. Clone the repository

```
git clone https://github.com/yourusername/hrms-lite.git
```

---

## 2. Setup Backend

Go to backend folder

```
cd hrms-api
npm install
```

Create `.env`

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start server

```
npm run dev
```

---

## 3. Setup Frontend

Open new terminal

```
cd hrms-ui
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```



# Assumptions

* Only **one admin user** exists
* No authentication system
* Employee ID is generated on backend
* Attendance defaults to **Present**
* Attendance can be updated anytime

---

# Notes

This project focuses on:

* clean UI
* modular code
* simple but functional HR system

The goal was to build a **stable working system rather than over-engineering features**.

---

# Author

Mohd Suhail
