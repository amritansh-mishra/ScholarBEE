const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const { verifyToken, requireRole, requireActiveUser } = require('../middleware/auth');

// Student applies for scholarship
router.post(
  '/apply/:scholarshipId',
  verifyToken,
  requireRole('student'),
  requireActiveUser,
  applicationController.submitApplication
);

// Sponsor gets applications for a scholarship
router.get(
  '/sponsor/applications/:id',
  verifyToken,
  requireRole('sponsor'),
  applicationController.getScholarshipApplications
);

// Sponsor approves/rejects an application
router.patch(
  '/applications/:id/decision',
  verifyToken,
  requireRole('sponsor'),
  applicationController.decideApplication
);

// Student uploads receipt
router.patch(
  '/applications/:id/receipt',
  verifyToken,
  requireRole('student'),
  requireActiveUser,
  applicationController.uploadReceipt
);

// Sponsor/Admin verifies receipt
router.patch(
  '/applications/:id/verify',
  verifyToken,
  requireRole('sponsor'), // Change to 'admin' if needed
  applicationController.verifyReceipt
);

module.exports = router;