const User = require('../models/userModel');

/**
 * 🔐 Mock Aadhaar eKYC Verification
 * Simulates IndiaStack Aadhaar API for student verification
 */
const verifyAadhaar = async (req, res) => {
  try {
    const { aadhaarNumber, otp } = req.body;
    const userId = req.user.id;

    // Validate Aadhaar number format (12 digits)
    if (!/^\d{12}$/.test(aadhaarNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Aadhaar number format. Must be 12 digits.'
      });
    }

    // Mock OTP validation (in real implementation, this would call Aadhaar API)
    if (otp !== '123456') {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP. Please try again.'
      });
    }

    // Mock Aadhaar data response
    const mockAadhaarData = {
      name: 'Rahul Kumar Sharma',
      dob: '1998-05-15',
      gender: 'Male',
      address: '123, Green Park, New Delhi - 110016',
      photo: 'https://via.placeholder.com/150x200/4ade80/ffffff?text=Photo'
    };

    // Update user with Aadhaar verification
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        aadhaarNumber,
        aadhaarVerified: true,
        aadhaarData: mockAadhaarData,
        verificationStatus: 'verified',
        lastVerificationAttempt: new Date()
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Aadhaar verification successful!',
      data: {
        aadhaarVerified: true,
        aadhaarData: mockAadhaarData
      }
    });

  } catch (error) {
    console.error('Aadhaar verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Verification failed. Please try again.'
    });
  }
};

/**
 * 📄 Mock DigiLocker Document Verification
 * Simulates DigiLocker API for document verification
 */
const verifyDigiLocker = async (req, res) => {
  try {
    const { documentType, documentNumber } = req.body;
    const userId = req.user.id;

    // Validate document types
    const validDocuments = ['10th_certificate', '12th_certificate', 'degree_certificate', 'income_certificate'];
    
    if (!validDocuments.includes(documentType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid document type. Please select a valid document.'
      });
    }

    // Mock document verification (in real implementation, this would call DigiLocker API)
    const mockDocumentData = {
      documentType,
      documentNumber,
      verified: true,
      verifiedAt: new Date(),
      documentDetails: {
        name: 'Rahul Kumar Sharma',
        institution: 'Delhi University',
        year: '2023',
        grade: 'A+'
      }
    };

    // Update user with DigiLocker verification
    const user = await User.findById(userId);
    
    // Check if document already exists
    const existingDocIndex = user.digiLockerDocuments.findIndex(
      doc => doc.documentType === documentType
    );

    if (existingDocIndex >= 0) {
      // Update existing document
      user.digiLockerDocuments[existingDocIndex] = mockDocumentData;
    } else {
      // Add new document
      user.digiLockerDocuments.push(mockDocumentData);
    }

    // Mark as verified if at least one document is verified
    user.digiLockerVerified = user.digiLockerDocuments.some(doc => doc.verified);
    user.verificationStatus = user.digiLockerVerified ? 'verified' : 'pending';
    
    await user.save();

    res.json({
      success: true,
      message: 'Document verification successful!',
      data: {
        documentType,
        verified: true,
        documentDetails: mockDocumentData.documentDetails
      }
    });

  } catch (error) {
    console.error('DigiLocker verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Document verification failed. Please try again.'
    });
  }
};

/**
 * 📊 Get Verification Status
 * Returns current verification status for the user
 */
const getVerificationStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('verificationStatus aadhaarVerified digiLockerVerified aadhaarData digiLockerDocuments');

    res.json({
      success: true,
      data: {
        verificationStatus: user.verificationStatus,
        aadhaarVerified: user.aadhaarVerified,
        digiLockerVerified: user.digiLockerVerified,
        aadhaarData: user.aadhaarData,
        documents: user.digiLockerDocuments
      }
    });

  } catch (error) {
    console.error('Get verification status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get verification status.'
    });
  }
};

/**
 * 🔄 Send Aadhaar OTP
 * Mock function to send OTP to Aadhaar-linked mobile
 */
const sendAadhaarOTP = async (req, res) => {
  try {
    const { aadhaarNumber } = req.body;

    // Validate Aadhaar number
    if (!/^\d{12}$/.test(aadhaarNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Aadhaar number format.'
      });
    }

    // Mock OTP sending (in real implementation, this would call Aadhaar API)
    // For demo purposes, OTP is always '123456'
    
    res.json({
      success: true,
      message: 'OTP sent successfully to your Aadhaar-linked mobile number.',
      data: {
        otpSent: true,
        // In real implementation, OTP would be sent via SMS
        demoOTP: '123456' // Only for demo purposes
      }
    });

  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP. Please try again.'
    });
  }
};

module.exports = {
  verifyAadhaar,
  verifyDigiLocker,
  getVerificationStatus,
  sendAadhaarOTP
}; 