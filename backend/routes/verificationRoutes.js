const express = require('express');
const router = express.Router();
const { verifyAadhaar, verifyDigiLocker, getVerificationStatus, sendAadhaarOTP } = require('../controllers/verificationController');
const { verifyToken } = require('../middleware/auth');

// All routes require authentication
router.use(verifyToken);

// 🔐 Aadhaar Verification Routes
router.post('/aadhaar/send-otp', sendAadhaarOTP);
router.post('/aadhaar/verify', verifyAadhaar);

// 📄 DigiLocker Verification Routes
router.post('/digilocker/verify', verifyDigiLocker);

// 📊 Get Verification Status
router.get('/status', getVerificationStatus);

module.exports = router; 