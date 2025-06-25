/**
 * 🌐 API Service Configuration
 * Centralized service for handling all API calls to the backend
 */

// 🚀 API Base Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * 🔧 HTTP Request Helper
 * Handles common HTTP requests with error handling and authentication
 * @param {string} endpoint - API endpoint path
 * @param {Object} options - Fetch options
 * @returns {Promise} Response data
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get auth token from localStorage
  const token = localStorage.getItem('authToken');
  
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add authorization header if token exists
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle non-2xx responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    // Parse JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ API Request Error:', error);
    throw error;
  }
};

/**
 * 🔐 Authentication API Methods
 */
export const authAPI = {
  // Login user
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),

  // Register student
  registerStudent: (userData) => apiRequest('/auth/student/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  // Register sponsor
  registerSponsor: (userData) => apiRequest('/auth/sponsor/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  // Forgot password
  forgotPassword: (email) => apiRequest('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  }),

  // Reset password
  resetPassword: (token, newPassword) => apiRequest('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, newPassword }),
  }),
};

/**
 * 👤 User API Methods
 */
export const userAPI = {
  // Get user profile
  getProfile: () => apiRequest('/users/profile'),

  // Update user profile
  updateProfile: (profileData) => apiRequest('/users/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  }),

  // Change password
  changePassword: (passwordData) => apiRequest('/users/change-password', {
    method: 'PUT',
    body: JSON.stringify(passwordData),
  }),
};

/**
 * 🎓 Student API Methods
 */
export const studentAPI = {
  // Get student dashboard data
  getDashboard: () => apiRequest('/students/dashboard'),

  // Get student applications
  getApplications: () => apiRequest('/students/applications'),

  // Apply for scholarship
  applyForScholarship: (scholarshipId, applicationData) => apiRequest(`/students/apply/${scholarshipId}`, {
    method: 'POST',
    body: JSON.stringify(applicationData),
  }),
};

/**
 * 💼 Sponsor API Methods
 */
export const sponsorAPI = {
  // Get sponsor dashboard
  getDashboard: () => apiRequest('/sponsors/dashboard'),

  // Get sponsor's scholarships
  getScholarships: () => apiRequest('/sponsors/scholarships'),

  // Get applications for a specific scholarship
  getScholarshipApplications: (scholarshipId) => apiRequest(`/sponsors/scholarships/${scholarshipId}/applications`),

  // Create new scholarship
  createScholarship: (scholarshipData) => apiRequest('/sponsors/scholarships', {
    method: 'POST',
    body: JSON.stringify(scholarshipData),
  }),

  // Update scholarship
  updateScholarship: (scholarshipId, scholarshipData) => apiRequest(`/sponsors/scholarships/${scholarshipId}`, {
    method: 'PUT',
    body: JSON.stringify(scholarshipData),
  }),

  // Delete scholarship
  deleteScholarship: (scholarshipId) => apiRequest(`/sponsors/scholarships/${scholarshipId}`, {
    method: 'DELETE',
  }),

  // Approve application
  approveApplication: (applicationId) => apiRequest(`/sponsors/applications/${applicationId}/approve`, {
    method: 'PATCH',
  }),

  // Reject application
  rejectApplication: (applicationId, reason) => apiRequest(`/sponsors/applications/${applicationId}/reject`, {
    method: 'PATCH',
    body: JSON.stringify({ reason }),
  }),
};

/**
 * 📋 Application API Methods
 */
export const applicationAPI = {
  // Get all applications (admin)
  getAllApplications: () => apiRequest('/applications'),

  // Get application by ID
  getApplication: (applicationId) => apiRequest(`/applications/${applicationId}`),

  // Update application
  updateApplication: (applicationId, updateData) => 
    apiRequest(`/applications/${applicationId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    }),
};

/**
 * 🏢 Admin API Methods
 */
export const adminAPI = {
  // Get admin dashboard
  getDashboard: () => apiRequest('/admin/dashboard'),

  // Get all users
  getUsers: () => apiRequest('/admin/users'),

  // Update user status
  updateUserStatus: (userId, status) => 
    apiRequest(`/admin/users/${userId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
};

/**
 * 📊 Dashboard API Methods
 */
export const dashboardAPI = {
  // Get NGO dashboard data
  getNGODashboard: () => apiRequest('/dashboards/ngo'),

  // Get student progress data
  getStudentProgress: () => apiRequest('/dashboards/student-progress'),
};

/**
 * 🏛️ Institutional API Methods
 */
export const institutionalAPI = {
  // Get college portal data
  getCollegePortal: () => apiRequest('/institutional/college'),

  // Get CSR portal data
  getCSRPortal: () => apiRequest('/institutional/csr'),
};

/**
 * 🌍 Public API Methods
 */
export const publicAPI = {
  // Get landing page data
  getLandingData: () => apiRequest('/landing'),

  // Get about page data
  getAboutData: () => apiRequest('/about'),

  // Get contact page data
  getContactData: () => apiRequest('/contact'),

  // Get courses data
  getCoursesData: () => apiRequest('/courses'),

  // Submit contact form
  submitContact: (contactData) => apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(contactData),
  }),

  // Health check
  healthCheck: () => apiRequest('/health'),
};

// Export default API object with all methods
export default {
  auth: authAPI,
  user: userAPI,
  student: studentAPI,
  sponsor: sponsorAPI,
  application: applicationAPI,
  admin: adminAPI,
  dashboard: dashboardAPI,
  institutional: institutionalAPI,
  public: publicAPI,
}; 