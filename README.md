# 🐝 ScholarBEE - Micro-Scholarship Management Platform

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **A full-stack Micro-scholarship management platform connecting students with educational opportunities and sponsors**

## 🎯 What We Built

A Micro-scholarship is a small financial award typically given to students for specific achievements, milestones, or behaviors, rather than a large, lump-sum traditional scholarship. These can help students gradually earn money for college or other educational needs.
ScholarBEE is a comprehensive Micro-scholarship management system that bridges the gap between students seeking financial aid and organizations offering scholarships.

### Key Features of Micro-Scholarships

- **💰 Small Amounts**: Awards usually range from a few dollars to a few hundred dollars.

- **🧠 Merit-Based or Activity-Based**: Given for things like good grades, extracurricular involvement, community service, test scores, etc.

- **🏫 Cumulative**: Students can earn multiple micro-scholarships over time, which add up.

- **🎯 Often Targeted at High School Students**: Especially those preparing for college.

( **NOTE**: "We are in an active phase of research and development, working to introduce innovative features that will enrich user experience and strengthen the impact of micro-scholarships." )

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express.js** - Robust API server
- **MongoDB** + **Mongoose** - Scalable database with ODM
- **JWT Authentication** - Secure user sessions
- **Multer** - File upload handling

### Frontend
- **React 18** - Modern UI framework
- **JavaScript (JSX)** - Component development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling


## 🚀 Quick Start (5 Minutes!)

### Prerequisites
- Node.js (v16+) - [Download](https://nodejs.org/)
- MongoDB - [Install Guide](https://docs.mongodb.com/manual/installation/)

### 🎯 One-Command Setup
```bash
# Clone and setup everything automatically
git clone <repository-url>
cd ScholarBEE
./start-dev.sh
```

**Demo Video**: https://youtu.be/e4Y-yFGUmIs

**This application will be running at**:
-  **Frontend**: https://scholarbee-frontend.onrender.com
-  **Backend API**: https://scholarbee-glqt.onrender.com
-  **Backend Health Status**: https://scholarbee-frontend.onrender.com/api/health


**Test-Sample** 
-  **Student-Login** : Email- student1@example.com , Password- 123456789a
-  **Sponsor-Login** : Email- sponsor1@gmail.com , Passord - 123456789a


### Manual Setup
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```


## 🏗️ Architecture

```
ScholarBEE/
├── backend/          # Node.js + Express API
│   ├── controllers/  # Business logic
│   ├── models/       # Database schemas
│   ├── routes/       # API endpoints
│   └── middleware/   # Custom middleware
├── frontend/         # React + JavaScript
│   ├── components/   # Reusable UI components
│   ├── pages/        # Page components
│   ├── services/     # API integration
│   └── contexts/     # State management
└── docs/            # Documentation
```

## 🔌 API Highlights

### Authentication
```bash
POST /api/auth/login
POST /api/auth/register/student
POST /api/auth/register/sponsor
```

### Scholarships
```bash
GET    /api/scholarships          # Browse scholarships
POST   /api/scholarships          # Create scholarship
GET    /api/scholarships/:id      # Get details
PUT    /api/scholarships/:id      # Update scholarship
DELETE /api/scholarships/:id      # Delete scholarship
```

### Applications
```bash
POST   /api/applications          # Submit application
GET    /api/applications          # List applications
PUT    /api/applications/:id      # Update status
```

## 🎯 What Makes This Special

### 🚀 **Performance**
- Lightning-fast Vite build system
- Optimized database queries
- Efficient state management

### 🔒 **Security**
- JWT-based authentication
- Role-based access control
- Input validation and sanitization

### 📱 **User Experience**
- Responsive design for all devices
- Intuitive navigation
- Real-time feedback



**Built with ❤️ for the hackathon community**

*Ready to revolutionize scholarship management? Let's connect students with opportunities! 🎓* 
