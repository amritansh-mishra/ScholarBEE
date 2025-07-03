import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import AIDocumentChecker from '../../components/AIDocumentChecker';
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  Award, 
  Clock, 
  Users, 
  Star,
  IndianRupee,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const mockScholarship = {
  id: '1',
  title: 'Web Development Mastery',
  sponsor: 'TechCorp Foundation',
  amount: 1000,
  deadline: '2024-02-15',
  category: 'Technology',
  difficulty: 'Intermediate',
  participants: 234,
  description: 'Complete a full-stack web application and showcase your skills in modern web development. This scholarship is designed to help students learn practical skills while earning financial rewards.',
  requirements: [
    'Build a complete web application using React and Node.js',
    'Implement user authentication and authorization',
    'Create a responsive design that works on all devices',
    'Deploy your application to a cloud platform',
    'Write comprehensive documentation',
    'Present your project in a 5-minute video'
  ],
  tags: ['React', 'Node.js', 'Database'],
  match: 95,
  milestones: [
    { id: 1, title: 'Project Planning & Setup', reward: 200, completed: false },
    { id: 2, title: 'Frontend Development', reward: 300, completed: false },
    { id: 3, title: 'Backend Development', reward: 300, completed: false },
    { id: 4, title: 'Deployment & Documentation', reward: 200, completed: false }
  ]
};

export default function ScholarshipApplication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState({
    essay: '',
    motivation: '',
    experience: '',
    timeline: '',
    portfolio: ''
  });
  const [documentVerifications, setDocumentVerifications] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setApplication({
      ...application,
      [e.target.name]: e.target.value
    });
  };

  const handleDocumentVerification = (documentType, result) => {
    setDocumentVerifications({
      ...documentVerifications,
      [documentType]: result
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    navigate('/student/applications');
  };

  const allDocumentsVerified = Object.values(documentVerifications).every(
    (verification) => verification?.isVerified
  );

  const hasUnverifiedDocuments = Object.values(documentVerifications).some(
    (verification) => verification && !verification.isVerified
  );

  return (
    <Layout>
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Application Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Apply for Scholarship</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Project Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Description
                    </label>
                    <textarea
                      name="essay"
                      value={application.essay}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe the web application you plan to build. What problem will it solve? What technologies will you use?"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">Minimum 200 words</p>
                  </div>

                  {/* Motivation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Why should you receive this scholarship?
                    </label>
                    <textarea
                      name="motivation"
                      value={application.motivation}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us about your motivation, goals, and how this scholarship will help you..."
                      required
                    />
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Relevant Experience
                    </label>
                    <textarea
                      name="experience"
                      value={application.experience}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Share your experience with web development, any projects you've worked on, courses completed, etc."
                    />
                  </div>

                  {/* Timeline */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Timeline
                    </label>
                    <textarea
                      name="timeline"
                      value={application.timeline}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="How do you plan to complete this project? Break down your timeline by milestones..."
                      required
                    />
                  </div>

                  {/* Portfolio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Portfolio/GitHub Links
                    </label>
                    <input
                      type="url"
                      name="portfolio"
                      value={application.portfolio}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://github.com/yourusername or https://yourportfolio.com"
                    />
                  </div>

                  {/* AI Document Verification */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Document Verification</h3>
                    
                    <AIDocumentChecker
                      documentType="Resume/CV"
                      onVerificationComplete={(result) => handleDocumentVerification('resume', result)}
                      required
                    />
                    
                    <AIDocumentChecker
                      documentType="Academic Transcript"
                      onVerificationComplete={(result) => handleDocumentVerification('transcript', result)}
                      required
                    />
                    
                    <AIDocumentChecker
                      documentType="ID Proof"
                      onVerificationComplete={(result) => handleDocumentVerification('id_proof', result)}
                      acceptedTypes={['.pdf', '.jpg', '.jpeg', '.png']}
                      required
                    />
                    
                    <AIDocumentChecker
                      documentType="Portfolio/Project Screenshots"
                      onVerificationComplete={(result) => handleDocumentVerification('portfolio_docs', result)}
                      acceptedTypes={['.pdf', '.jpg', '.jpeg', '.png', '.zip']}
                    />
                  </div>

                  {/* Document Verification Status */}
                  {Object.keys(documentVerifications).length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">Document Verification Status</h4>
                      <div className="space-y-2">
                        {Object.entries(documentVerifications).map(([docType, verification]) => (
                          <div key={docType} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 capitalize">{docType.replace('_', ' ')}</span>
                            <div className="flex items-center gap-2">
                              {verification.isVerified ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-red-600" />
                              )}
                              <span className={`text-sm font-medium ${
                                verification.isVerified ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {verification.confidenceScore}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {hasUnverifiedDocuments && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center gap-2 text-red-800">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="text-sm font-medium">Document Verification Issues</span>
                          </div>
                          <p className="text-sm text-red-700 mt-1">
                            Some documents failed verification. Please upload different documents or contact support.
                          </p>
                        </div>
                      )}
                      
                      {allDocumentsVerified && (
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-2 text-green-800">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">All Documents Verified</span>
                          </div>
                          <p className="text-sm text-green-700 mt-1">
                            Your documents have been successfully verified by our AI system.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Terms */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the scholarship terms and conditions. I understand that I must complete all milestones to receive the full reward and that my submissions will be verified for authenticity.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || hasUnverifiedDocuments}
                    className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                      isSubmitting || hasUnverifiedDocuments
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                    }`}
                  >
                    {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                  </button>
                  
                  {hasUnverifiedDocuments && (
                    <p className="text-sm text-red-600 text-center">
                      Please resolve document verification issues before submitting.
                    </p>
                  )}
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Scholarship Details */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{mockScholarship.title}</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Reward</span>
                    <span className="text-2xl font-bold text-green-600">₹{mockScholarship.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Sponsor</span>
                    <span className="font-medium">{mockScholarship.sponsor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Deadline</span>
                    <span className="font-medium">{new Date(mockScholarship.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Applicants</span>
                    <span className="font-medium">{mockScholarship.participants}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Match Score</span>
                    <div className="flex items-center gap-1">
                      <span>Star,</span>
                      <span className="font-medium">{mockScholarship.match}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestones */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Reward Milestones</h3>
                <div className="space-y-3">
                  {mockScholarship.milestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          {milestone.completed ? (
                            <CheckCircle className="w-4 h-4 text-white" />
                          ) : (
                            <span className="text-xs text-white font-bold">{milestone.id}</span>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{milestone.title}</p>
                          <p className="text-xs text-green-600 font-medium">₹{milestone.reward}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-800">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Pro Tip</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    Complete milestones to unlock rewards instantly via UPI!
                  </p>
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Requirements</h3>
                <ul className="space-y-2">
                  {mockScholarship.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}