const Scholarship = require('../models/scholarshipModel');
const Application = require('../models/applicationModel');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const xss = require('xss');

// GET /sponsor/profile
exports.getProfile = async (req, res) => {
  try {
    const sponsor = await User.findById(req.user.id).select('-password');
    res.json(sponsor);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load sponsor profile' });
  }
};

// PUT /sponsor/profile
exports.updateProfile = async (req, res) => {
  const updates = req.body;
  try {
    const sponsor = await User.findById(req.user.id);

    // Prevent students from updating sponsor-only fields
    if (sponsor.role !== 'sponsor') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const allowedFields = ['fullname', 'phone', 'profilePic', 'organizationName', 'organizationType', 'missionStatement', 'logoUrl'];
    allowedFields.forEach(field => {
      if (updates[field] !== undefined) {
        sponsor[field] = updates[field];
      }
    });

    await sponsor.save();
    res.json({ message: 'Profile updated successfully', sponsor });
  } catch (err) {
    res.status(500).json({ message: 'Error updating sponsor profile' });
  }
};

// Get sponsor dashboard data
exports.getSponsorDashboard = async (req, res) => {
  try {
    const sponsorId = req.user.id;

    // Get sponsor's scholarships, sorted by most recent
    const scholarships = await Scholarship.find({ sponsorId })
      .sort({ createdAt: -1 });

    // Calculate statistics
    const totalDonated = scholarships
      .filter(sch => sch.status === 'completed')
      .reduce((sum, sch) => sum + sch.totalBudget, 0);

    const studentsHelped = await Application.countDocuments({
      scholarshipId: { $in: scholarships.map(s => s._id) },
      status: 'funded'
    });

    const activeScholarships = scholarships.filter(sch => sch.status === 'active').length;
    const completedScholarships = scholarships.filter(sch => sch.status === 'completed').length;

    // Get recent scholarships (latest 3)
    const recentScholarships = scholarships.slice(0, 3).map(sch => ({
      id: sch._id,
      title: sch.title,
      amount: sch.amount,
      applicants: sch.applicants,
      approved: sch.approved,
      deadline: sch.deadline,
      status: sch.status,
      description: sch.description,
      category: sch.category,
      numberOfAwards: sch.numberOfAwards,
      totalBudget: sch.totalBudget,
      createdAt: sch.createdAt,
      tags: sch.tags
    }));

    // Get recent applications
    const recentApplications = await Application.find({
      scholarshipId: { $in: scholarships.map(s => s._id) }
    })
    .populate('studentId', 'fullname email gpa institution')
    .populate('scholarshipId', 'title')
    .sort({ createdAt: -1 })
    .limit(3);

    const formattedApplications = recentApplications.map(app => ({
      id: app._id,
      studentName: app.studentId.fullname,
      scholarshipTitle: app.scholarshipId.title,
      appliedDate: app.createdAt,
      status: app.status,
      gpa: app.studentId.gpa || 'N/A',
      institution: app.studentId.institution || 'N/A'
    }));

    res.json({
      stats: {
        totalDonated,
        studentsHelped,
        activeScholarships,
        completedScholarships
      },
      recentScholarships,
      recentApplications: formattedApplications
    });
  } catch (error) {
    console.error('Error fetching sponsor dashboard:', error);
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
};

// Get sponsor's scholarships
exports.getSponsorScholarships = async (req, res) => {
  try {
    const sponsorId = req.user.id;
    const scholarships = await Scholarship.find({ sponsorId })
      .sort({ createdAt: -1 });

    const formattedScholarships = scholarships.map(sch => ({
      id: sch._id,
      title: sch.title,
      description: sch.description,
      category: sch.category,
      amount: sch.amount,
      numberOfAwards: sch.numberOfAwards,
      totalBudget: sch.totalBudget,
      deadline: sch.deadline,
      createdDate: sch.createdAt,
      status: sch.status,
      applicants: sch.applicants,
      approved: sch.approved,
      rejected: sch.rejected,
      pending: sch.pending,
      tags: sch.tags
    }));

    res.json({ scholarships: formattedScholarships });
  } catch (error) {
    console.error('Error fetching sponsor scholarships:', error);
    res.status(500).json({ message: 'Error fetching scholarships' });
  }
};

// Get a single scholarship by ID
exports.getScholarshipById = async (req, res) => {
  try {
    const { id } = req.params;
    const sponsorId = req.user.id;
// debug
    // Verify the scholarship belongs to the sponsor
    const scholarship = await Scholarship.findOne({ _id: id, sponsorId });
    if (!scholarship) {
      return res.status(404).json({ 
        success: false,
        message: 'Scholarship not found. It may not exist or does not belong to you.' 
      });
    }

    res.json({
      success: true,
      scholarship: {
        id: scholarship._id,
        title: scholarship.title,
        description: scholarship.description,
        category: scholarship.category,
        amount: scholarship.amount,
        numberOfAwards: scholarship.numberOfAwards,
        totalBudget: scholarship.totalBudget,
        deadline: scholarship.deadline,
        status: scholarship.status,
        paymentStatus: scholarship.paymentStatus,
        difficulty: scholarship.difficulty,
        requirements: scholarship.requirements,
        eligibilityCriteria: scholarship.eligibilityCriteria,
        submissionGuidelines: scholarship.submissionGuidelines,
        evaluationCriteria: scholarship.evaluationCriteria,
        tags: scholarship.tags,
        createdAt: scholarship.createdAt
      }
    });
  } catch (error) {
    console.error('Error fetching scholarship:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching scholarship' 
    });
  }
};

// Get applications for a specific scholarship
exports.getScholarshipApplications = async (req, res) => {
  try {
    const { scholarshipId } = req.params;
    const sponsorId = req.user.id;

    // Verify the scholarship belongs to the sponsor
    const scholarship = await Scholarship.findOne({ _id: scholarshipId, sponsorId });
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }

    const applications = await Application.find({ scholarshipId })
      .populate('studentId', 'fullname email phone institution course year gpa city')
      .sort({ createdAt: -1 });

    const formattedApplications = applications.map(app => ({
      id: app._id,
      student: {
        name: app.studentId.fullname,
        email: app.studentId.email,
        phone: app.studentId.phone,
        institution: app.studentId.institution,
        course: app.studentId.course,
        year: app.studentId.year,
        gpa: app.studentId.gpa,
        city: app.studentId.city
      },
      appliedDate: app.createdAt,
      status: app.status,
      essay: app.essay,
      projectPlan: app.projectPlan,
      timeline: app.timeline,
      documents: app.documents,
      reviewNotes: app.reviewNotes,
      reviewedAt: app.reviewedAt,
      submittedAt: app.createdAt
    }));

    res.json({
      scholarship: {
        id: scholarship._id,
        title: scholarship.title,
        amount: scholarship.amount,
        numberOfAwards: scholarship.numberOfAwards,
        deadline: scholarship.deadline,
        description: scholarship.description,
        requirements: scholarship.requirements
      },
      applications: formattedApplications
    });
  } catch (error) {
    console.error('Error fetching scholarship applications:', error);
    res.status(500).json({ message: 'Error fetching applications' });
  }
};

exports.createScholarship = async (req, res) => {
  try {
    // Sanitize input data
    const sanitizedData = {
      title: xss(req.body.title),
      description: xss(req.body.description),
      category: xss(req.body.category),
      amount: parseInt(req.body.amount),
      numberOfAwards: parseInt(req.body.numberOfAwards),
      totalBudget: parseInt(req.body.totalBudget),
      deadline: new Date(req.body.deadline),
      difficulty: req.body.difficulty,
      requirements: Array.isArray(req.body.requirements) 
        ? req.body.requirements.map(req => xss(req))
        : [],
      eligibilityCriteria: xss(req.body.eligibilityCriteria),
      submissionGuidelines: xss(req.body.submissionGuidelines),
      evaluationCriteria: xss(req.body.evaluationCriteria || ''),
      tags: Array.isArray(req.body.tags) 
        ? req.body.tags.map(tag => xss(tag))
        : [],
      status: 'draft', // Always start as draft
      paymentStatus: 'pending', // Payment is required
      sponsorId: req.user.id
    };

    // Create scholarship as draft (not yet active)
    const scholarship = new Scholarship(sanitizedData);
    await scholarship.save();
    
    res.status(201).json({ 
      message: 'Scholarship draft created. Payment required to activate.',
      scholarship: {
        id: scholarship._id,
        title: scholarship.title,
        amount: scholarship.amount,
        numberOfAwards: scholarship.numberOfAwards,
        totalBudget: scholarship.totalBudget,
        status: scholarship.status,
        paymentStatus: scholarship.paymentStatus
      }
    });
  } catch (err) {
    console.error('Scholarship creation error:', err);
    res.status(500).json({ message: 'Creation failed' });
  }
};

exports.listScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find({ sponsorId: req.user.id });
    res.json(scholarships);
  } catch (err) {
    res.status(500).json({ message: 'Failed to list scholarships' });
  }
};

exports.updateScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.findOneAndUpdate(
      { _id: req.params.id, sponsorId: req.user.id },
      req.body,
      { new: true }
    );
    if (!scholarship) return res.status(404).json({ message: 'Scholarship not found or not owned by you' });
    res.json({ message: 'Scholarship updated', scholarship });
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
};

exports.closeScholarship = async (req, res) => {
  try {
    const updated = await Scholarship.findOneAndUpdate(
      { _id: req.params.id, sponsorId: req.user.id },
      { status: 'closed' },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Scholarship not found or not yours' });
    res.json({ message: 'Scholarship closed', updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to close scholarship' });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const apps = await Application.find({ scholarshipId: req.params.id }).populate('studentId');
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
};

exports.decideApplication = async (req, res) => {
  const { status } = req.body; // "approved" or "rejected"
  try {
    const validStatuses = ['approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid decision status' });
    }

    const app = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('studentId');

    if (!app) return res.status(404).json({ message: 'Application not found' });

    res.json({ message: `Application ${status}`, application: app });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update application status' });
  }
};

// Delete unpaid draft scholarship
exports.deleteDraftScholarship = async (req, res) => {
  try {
    const { id } = req.params;
    const sponsorId = req.user.id;

    // Find the scholarship and verify it belongs to the sponsor
    const scholarship = await Scholarship.findOne({ 
      _id: id, 
      sponsorId,
      status: 'draft',
      paymentStatus: 'pending'
    });

    if (!scholarship) {
      return res.status(404).json({ 
        success: false,
        message: 'Draft scholarship not found or cannot be deleted' 
      });
    }

    // Delete the scholarship
    await Scholarship.findByIdAndDelete(id);

    res.json({ 
      success: true,
      message: 'Draft scholarship deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting draft scholarship:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error deleting draft scholarship' 
    });
  }
};
