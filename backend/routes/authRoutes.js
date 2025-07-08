const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const { body } = require('express-validator');

// Student Signup
router.post(
  '/student/signup',
  [
    body('fullname').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('institution').notEmpty(),
    body('educationLevel').notEmpty(),
    body('gpa').notEmpty(),
    body('familyIncome').notEmpty()
  ],
  authController.registerStudent
);

// Sponsor Signup
router.post(
  '/sponsor/signup',
  [
    body('fullname').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('organizationType').notEmpty(),
    body('organizationName').notEmpty()
  ],
  authController.registerSponsor
);

// Common Login (student/sponsor)
router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').notEmpty()
  ],
  authController.login
);

// Forgot Password (sends email)
router.post(
  '/forgot-password',
  [body('email').isEmail()],
  authController.forgotPassword
);

// Reset Password using token
router.post(
  '/reset-password',
  [
    body('token').notEmpty(),
    body('newPassword').isLength({ min: 6 })
  ],
  authController.resetPassword
);

const originalPost = router.post.bind(router);
router.post = (path, ...args) => {
  console.log('Registering POST route:', path);
  return originalPost(path, ...args);
};
const originalGet = router.get.bind(router);
router.get = (path, ...args) => {
  console.log('Registering GET route:', path);
  return originalGet(path, ...args);
};
const originalPut = router.put.bind(router);
router.put = (path, ...args) => {
  console.log('Registering PUT route:', path);
  return originalPut(path, ...args);
};
const originalPatch = router.patch.bind(router);
router.patch = (path, ...args) => {
  console.log('Registering PATCH route:', path);
  return originalPatch(path, ...args);
};
const originalDelete = router.delete.bind(router);
router.delete = (path, ...args) => {
  console.log('Registering DELETE route:', path);
  return originalDelete(path, ...args);
};

module.exports = router;
