const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file into process.env

const express = require('express');
const app = express();
const cors = require('cors');
const connectToDb = require('./db/db'); // Import database connection function

// Connect to MongoDB database
connectToDb();

// Route Imports - All API route modules
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const sponserRoutes = require('./routes/sponserRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const institutionalRoutes = require('./routes/institutionalRoutes');
const publicRoutes = require('./routes/publicRoute');
const walletRoutes = require('./routes/walletRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

//  Middleware Configuration
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

//  CORS Configuration - Allow frontend to communicate with backend
// Beginner-friendly: Allow all origins in development
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL] 
    : ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174', 'http://localhost:3000'],
  credentials: true, // Allow cookies and authentication headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token', 'Origin', 'Accept'],
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

//  API Route Mounting - Organize routes by functionality
app.use('/api/auth', authRoutes);                 // Authentication: Login, Register, Forgot Password
app.use('/api/users', userRoutes);               // User Management: Profile, Change Password
app.use('/api/students', studentRoutes);         // Student Features: Dashboard, Applications
app.use('/api/sponsors', sponserRoutes);         // Sponsor Features: Dashboard, Scholarships
app.use('/api/applications', applicationRoutes); // Application Management
app.use('/api/admin', adminRoutes);              // Admin Dashboard & Management
app.use('/api/dashboards', dashboardRoutes);     // NGO and Student Progress Dashboards
app.use('/api/institutional', institutionalRoutes); // College and CSR Portals
app.use('/api/wallet', walletRoutes);            // Student Wallet Management
app.use('/api/payments', paymentRoutes);         // Sponsor Payment Management
app.use('/api', publicRoutes);                   // Public Pages: Landing, About, Contact, Courses

//  Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'ScholarBEE Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173'
  });
});

//  Global Error Handler (should be after all routes)
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err);
  res.status(500).json({ 
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

//  404 Handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    path: req.originalUrl,
    availableRoutes: [
      '/api/health',
      '/api/auth/*',
      '/api/users/*',
      '/api/students/*',
      '/api/sponsors/*',
      '/api/applications/*',
      '/api/admin/*',
      '/api/dashboards/*',
      '/api/institutional/*'
    ]
  });
});

module.exports = app;
// This is the main entry point for the backend server.
// It sets up an Express server that listens on port 4000.
// The server responds to GET requests at the root URL with a welcome message