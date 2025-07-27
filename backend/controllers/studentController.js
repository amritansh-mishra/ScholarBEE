const Application = require('../models/applicationModel');
const Scholarship = require('../models/scholarshipModel');
const User = require('../models/userModel');

/**
 * Apply for Scholarship Controller
 * Allows students to submit new scholarship applications
 * @param {Object} req - Express request object
 * @param {Object} req.params - Contains scholarshipId
 * @param {Object} req.body - Contains essay, motivation, projectPlan, timeline, documents, and amount
 * @param {Object} res - Express response object
 */
exports.applyScholarship = async (req, res) => {
  const { scholarshipId } = req.params;
  const { essay, motivation, projectPlan, timeline, documents, amount } = req.body;

  try {
    const scholarship = await Scholarship.findById(scholarshipId);
    if (!scholarship || scholarship.status !== 'active') {
      return res.status(400).json({ message: 'Invalid or inactive scholarship' });
    }

    const existing = await Application.findOne({
      scholarshipId,
      studentId: req.user.id
    });

    if (existing) {
      return res.status(409).json({ message: 'You already applied for this scholarship' });
    }

    const newApp = new Application({
      scholarshipId,
      studentId: req.user.id,
      essay,
      motivation,
      projectPlan,
      timeline,
      documents: documents || [],
      amount: amount || scholarship.amount
    });

    await newApp.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (err) {
    console.error('Application submission error:', err);
    res.status(500).json({ message: 'Submission failed', error: err.message });
  }
};

// Get student dashboard data
exports.getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;

    // Get student's applications
    const applications = await Application.find({ studentId })
      .populate('scholarshipId')
      .sort({ createdAt: -1 });

    // Calculate statistics
    const totalEarned = applications
      .filter(app => app.status === 'funded')
      .reduce((sum, app) => sum + app.amount, 0);

    const completedTasks = applications.filter(app => app.status === 'funded').length;
    const pendingApplications = applications.filter(app => app.status === 'pending').length;
    const currentStreak = 12; // This could be calculated based on activity

    // Get all scholarships (no deadline filter)
    const availableScholarships = await Scholarship.find({ 
      status: 'active'
    })
    .populate('sponsorId', 'fullname')
    .limit(10);

    // Get recent activities
    const recentActivities = applications
      .slice(0, 5)
      .map(app => ({
        id: app._id,
        action: `Application ${app.status === 'funded' ? 'Completed' : app.status === 'approved' ? 'Approved' : 'Submitted'}`,
        scholarshipTitle: app.scholarshipId.title,
        amount: app.amount,
        date: app.createdAt
      }));

    res.json({
      stats: {
        totalEarned,
        completedTasks,
        pendingApplications,
        currentStreak
      },
      scholarships: availableScholarships.map(scholarship => ({
        id: scholarship._id,
        title: scholarship.title,
        amount: scholarship.amount,
        deadline: scholarship.deadline,
        category: scholarship.category,
        difficulty: scholarship.difficulty,
        applicants: scholarship.applicants,
        description: scholarship.description,
        tags: scholarship.tags
      })),
      recentActivities
    });
  } catch (error) {
    console.error('Error fetching student dashboard:', error);
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
};

// Public endpoint to get scholarships (no authentication required)
exports.getPublicScholarships = async (req, res) => {
  try {
    // Get all scholarships (no deadline filter)
    const availableScholarships = await Scholarship.find({ 
      status: 'active'
    })
    .populate('sponsorId', 'fullname')
    .limit(10);

    res.json({
      stats: {
        totalEarned: 0,
        completedTasks: 0,
        pendingApplications: 0,
        currentStreak: 0
      },
      scholarships: availableScholarships.map(scholarship => ({
        id: scholarship._id,
        title: scholarship.title,
        amount: scholarship.amount,
        deadline: scholarship.deadline,
        category: scholarship.category,
        difficulty: scholarship.difficulty,
        applicants: scholarship.applicants,
        description: scholarship.description,
        tags: scholarship.tags
      })),
      recentActivities: []
    });
  } catch (error) {
    console.error('Error fetching public scholarships:', error);
    res.status(500).json({ message: 'Error fetching scholarships' });
  }
};

// Get student applications
exports.getStudentApplications = async (req, res) => {
  try {
    const studentId = req.user.id;
    const applications = await Application.find({ studentId })
      .populate('scholarshipId')
      .sort({ createdAt: -1 });

    const formattedApplications = applications.map(app => ({
      id: app._id,
      scholarshipTitle: app.scholarshipId.title,
      amount: app.amount,
      appliedDate: app.createdAt,
      deadline: app.scholarshipId.deadline,
      status: app.status,
      category: app.scholarshipId.category,
      description: app.scholarshipId.description,
      reviewNotes: app.reviewNotes,
      paymentDate: app.paymentDate
    }));

    res.json({ applications: formattedApplications });
  } catch (error) {
    console.error('Error fetching student applications:', error);
    res.status(500).json({ message: 'Error fetching applications' });
  }
};