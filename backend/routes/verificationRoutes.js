const express = require('express');
const router = express.Router();
const { verifyAadhaar, verifySchool, verifyDocuments, getVerificationStatus, sendAadhaarOTP, verifyDigiLocker } = require('../controllers/verificationController');
const { verifyToken } = require('../middleware/auth');

// All routes require authentication
router.use(verifyToken);

// 🔐 Aadhaar Verification Routes
router.post('/aadhaar/send-otp', sendAadhaarOTP);
router.post('/aadhaar/verify', verifyAadhaar);

// 🏫 School Verification Routes
router.post('/school/verify', verifySchool);

// 📄 Document Verification Routes
router.post('/documents/verify', verifyDocuments);

// 📄 DigiLocker Verification Route
router.post('/digilocker/verify', verifyDigiLocker);

// 📊 Get Verification Status
router.get('/status', getVerificationStatus);

module.exports = router; 