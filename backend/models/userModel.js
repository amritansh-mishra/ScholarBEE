const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullname: {
     type: String, 
     required: true
     },
  email: { 
    type: String,
    required: true, 
    unique: true
     },
  password: {
    type: String, 
    required: true
  },
  role: {
    type: String, 
    enum: ['student', 'sponsor', 'admin'], 
    required: true
  },
  phone: String,
  profilePic: String,
  status: {
    type: String,
    enum: ['pending_verification', 'active', 'inactive'],
    default: 'pending_verification'
  },

  // Student specific fields
  institution: String,
  educationLevel: String,
  gpa: String,
  familyIncome: String,
  skills: [String],
  resumeUrl: String,

  // Sponsor specific fields
  organizationType: String,
  organizationName: String,
  missionStatement: String,
  logoUrl: String,

  // Digital Verification Fields
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'failed'],
    default: 'pending'
  },
  aadhaarNumber: {
    type: String,
    sparse: true // Allows multiple null values
  },
  aadhaarVerified: {
    type: Boolean,
    default: false
  },
  aadhaarData: {
    name: String,
    dob: String,
    gender: String,
    address: String,
    photo: String
  },
  digiLockerVerified: {
    type: Boolean,
    default: false
  },
  digiLockerDocuments: [{
    documentType: String,
    documentNumber: String,
    verified: Boolean,
    verifiedAt: Date
  }],
  // School Information
  schoolAdmissionNumber: {
    type: String,
    sparse: true
  },
  schoolName: String,
  schoolVerified: {
    type: Boolean,
    default: false
  },
  // Document Verification
  documentsVerified: {
    type: Boolean,
    default: false
  },
  requiredDocuments: {
    schoolId: {
      verified: { type: Boolean, default: false },
      documentNumber: String,
      verifiedAt: Date
    },
    aadhaarCard: {
      verified: { type: Boolean, default: false },
      documentNumber: String,
      verifiedAt: Date
    }
  },
  verificationAttempts: {
    type: Number,
    default: 0
  },
  lastVerificationAttempt: Date

}, { timestamps: true });

// Add indexes for better query performance
// Note: email index is automatically created by unique: true constraint
userSchema.index({ role: 1 });
userSchema.index({ createdAt: -1 });

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.static.hashPassword = async function(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = mongoose.model('User', userSchema);