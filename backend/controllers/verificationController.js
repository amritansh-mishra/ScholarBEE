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
 * 🏫 School Verification
 * Verifies school admission number and school information
 */
const verifySchool = async (req, res) => {
  try {
    const { schoolAdmissionNumber, schoolName } = req.body;
    const userId = req.user.id;

    // Validate admission number format (alphanumeric, 6-12 characters)
    if (!schoolAdmissionNumber || schoolAdmissionNumber.length < 6 || schoolAdmissionNumber.length > 12) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid school admission number (6-12 characters).'
      });
    }

    if (!schoolName || schoolName.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid school name.'
      });
    }

    // Mock school verification (in real implementation, this would call school database API)
    const mockSchoolData = {
      schoolAdmissionNumber,
      schoolName: schoolName.trim(),
      schoolVerified: true,
      schoolDetails: {
        name: schoolName.trim(),
        admissionNumber: schoolAdmissionNumber,
        verified: true,
        verifiedAt: new Date()
      }
    };

    // Update user with school verification
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        schoolAdmissionNumber,
        schoolName: schoolName.trim(),
        schoolVerified: true,
        lastVerificationAttempt: new Date()
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'School verification successful!',
      data: {
        schoolVerified: true,
        schoolDetails: mockSchoolData.schoolDetails
      }
    });

  } catch (error) {
    console.error('School verification error:', error);
    res.status(500).json({
      success: false,
      message: 'School verification failed. Please try again.'
    });
  }
};

/**
 * 📄 Document Verification (School ID & Aadhaar Card)
 * Verifies required documents: School ID and Aadhaar Card
 */
const verifyDocuments = async (req, res) => {
  try {
    const { schoolIdNumber, aadhaarCardNumber } = req.body;
    const userId = req.user.id;

    // Validate school ID number
    if (!schoolIdNumber || schoolIdNumber.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid School ID number.'
      });
    }

    // Validate Aadhaar card number (12 digits)
    if (!aadhaarCardNumber || !/^\d{12}$/.test(aadhaarCardNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid 12-digit Aadhaar card number.'
      });
    }

    // Mock document verification (in real implementation, this would call document verification APIs)
    const mockDocumentData = {
      schoolId: {
        verified: true,
        documentNumber: schoolIdNumber.trim(),
        verifiedAt: new Date(),
        documentDetails: {
          type: 'School ID',
          number: schoolIdNumber.trim(),
          verified: true
        }
      },
      aadhaarCard: {
        verified: true,
        documentNumber: aadhaarCardNumber,
        verifiedAt: new Date(),
        documentDetails: {
          type: 'Aadhaar Card',
          number: aadhaarCardNumber,
          verified: true
        }
      }
    };

    // Update user with document verification
    const user = await User.findById(userId);
    
    user.requiredDocuments = mockDocumentData;
    user.documentsVerified = true;
    
    // Mark overall verification as complete if both Aadhaar and documents are verified
    if (user.aadhaarVerified && user.documentsVerified) {
      user.verificationStatus = 'verified';
    }
    
    await user.save();

    res.json({
      success: true,
      message: 'Document verification successful!',
      data: {
        documentsVerified: true,
        schoolIdVerified: true,
        aadhaarCardVerified: true,
        documentDetails: mockDocumentData
      }
    });

  } catch (error) {
    console.error('Document verification error:', error);
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
    const user = await User.findById(userId).select('verificationStatus aadhaarVerified schoolVerified documentsVerified aadhaarData schoolAdmissionNumber schoolName requiredDocuments');

    res.json({
      success: true,
      data: {
        verificationStatus: user.verificationStatus,
        aadhaarVerified: user.aadhaarVerified,
        schoolVerified: user.schoolVerified,
        documentsVerified: user.documentsVerified,
        aadhaarData: user.aadhaarData,
        schoolAdmissionNumber: user.schoolAdmissionNumber,
        schoolName: user.schoolName,
        requiredDocuments: user.requiredDocuments
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

/**
 * 📄 DigiLocker Document Verification
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
      user.digiLockerDocuments[existingDocIndex] = mockDocumentData;
    } else {
      user.digiLockerDocuments.push(mockDocumentData);
    }
    // Mark as verified if at least one document is verified
    user.digiLockerVerified = user.digiLockerDocuments.some(doc => doc.verified);
    // If all verifications are done, set status to verified
    if (user.aadhaarVerified && user.schoolVerified && user.documentsVerified && user.digiLockerVerified) {
      user.verificationStatus = 'verified';
      user.status = 'active';
    }
    await user.save();
    res.json({
      success: true,
      message: 'DigiLocker document verification successful!',
      data: mockDocumentData
    });
  } catch (error) {
    console.error('DigiLocker verification error:', error);
    res.status(500).json({
      success: false,
      message: 'DigiLocker document verification failed. Please try again.'
    });
  }
};

module.exports = {
  verifyAadhaar,
  verifySchool,
  verifyDocuments,
  getVerificationStatus,
  sendAadhaarOTP,
  verifyDigiLocker
}; 