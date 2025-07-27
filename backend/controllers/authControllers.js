const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const sendEmail = require('../utils/sendEmails');

const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

//  Student Signup
exports.registerStudent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { fullname, email, password, institution, educationLevel, gpa, familyIncome } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    // When creating a new student user, set status to 'pending_verification'
    const newUser = new User({
      fullname,
      email,
      password: hashed,
      role: 'student',
      institution,
      educationLevel,
      gpa,
      familyIncome,
      status: 'pending_verification',
      verificationStatus: 'pending',
      aadhaarVerified: false,
      schoolVerified: false,
      documentsVerified: false,
      digiLockerVerified: false
    });

    await newUser.save();

    // Generate JWT token for the new student
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Student registered successfully',
      token,
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        role: newUser.role,
        institution: newUser.institution,
        educationLevel: newUser.educationLevel,
        gpa: newUser.gpa,
        familyIncome: newUser.familyIncome
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' });
  }
};

//  Sponsor Signup
exports.registerSponsor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { fullname, email, password, organizationType, organizationName } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullname,
      email,
      password: hashed,
      role: 'sponsor',
      organizationType,
      organizationName
    });

    await newUser.save();

    // Generate JWT token for the new sponsor
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Sponsor registered successfully',
      token,
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        role: newUser.role,
        organizationType: newUser.organizationType,
        organizationName: newUser.organizationName
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' });
  }
};

//  Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, fullname: user.fullname, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};

//  Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '15m' });
    const resetLink = `${CLIENT_URL}/reset-password?token=${token}`;

    await sendEmail(email, 'Reset Password', `Click to reset password: ${resetLink}`);
    res.json({ message: 'Reset link sent to email' });
  } catch (err) {
    res.status(500).json({ message: 'Error sending email' });
  }
};

//  Reset Password
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(decoded.id, { password: hashed });
    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};
