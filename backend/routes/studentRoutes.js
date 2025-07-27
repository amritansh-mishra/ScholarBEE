const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { verifyToken, requireRole, requireActiveUser } = require('../middleware/auth');

// Get student dashboard data
router.get('/dashboard', verifyToken, requireRole('student'), requireActiveUser, studentController.getStudentDashboard);

// Get student applications
router.get('/applications', verifyToken, requireRole('student'), requireActiveUser, studentController.getStudentApplications);

router.post('/apply/:scholarshipId', verifyToken, requireRole('student'), requireActiveUser, studentController.applyScholarship);

module.exports = router;