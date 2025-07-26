import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, XCircle, Clock, Fingerprint, FileText, Smartphone } from 'lucide-react';
import { verificationAPI } from '../services/api';

const StudentVerification = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Aadhaar verification state
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  
  // DigiLocker verification state
  const [documentType, setDocumentType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [digiLockerVerified, setDigiLockerVerified] = useState(false);
  
  // Verification status
  const [verificationStatus, setVerificationStatus] = useState('pending');
  const [verificationData, setVerificationData] = useState(null);

  const navigate = useNavigate();

  // Load verification status on component mount
  useEffect(() => {
    loadVerificationStatus();
  }, []);

  const loadVerificationStatus = async () => {
    try {
      const response = await verificationAPI.getStatus();
      if (response.success) {
        setVerificationStatus(response.data.verificationStatus);
        setAadhaarVerified(response.data.aadhaarVerified);
        setDigiLockerVerified(response.data.digiLockerVerified);
        setVerificationData(response.data);
        
        // If already verified, redirect to dashboard
        if (response.data.verificationStatus === 'verified') {
          navigate('/student/dashboard');
        }
      }
    } catch (error) {
      console.error('Failed to load verification status:', error);
    }
  };

  // Send Aadhaar OTP
  const handleSendOTP = async () => {
    if (!aadhaarNumber || aadhaarNumber.length !== 12) {
      setError('Please enter a valid 12-digit Aadhaar number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await verificationAPI.sendAadhaarOTP(aadhaarNumber);
      if (response.success) {
        setOtpSent(true);
        setSuccess('OTP sent successfully! Check your Aadhaar-linked mobile.');
        // Show demo OTP for testing
        alert(`Demo OTP: ${response.data.demoOTP}`);
      }
    } catch (error) {
      setError(error.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // Verify Aadhaar
  const handleVerifyAadhaar = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await verificationAPI.verifyAadhaar(aadhaarNumber, otp);
      if (response.success) {
        setAadhaarVerified(true);
        setSuccess('Aadhaar verification successful!');
        setCurrentStep(2);
        loadVerificationStatus();
      }
    } catch (error) {
      setError(error.message || 'Aadhaar verification failed');
    } finally {
      setLoading(false);
    }
  };

  // Verify DigiLocker document
  const handleVerifyDigiLocker = async () => {
    if (!documentType || !documentNumber) {
      setError('Please select document type and enter document number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await verificationAPI.verifyDigiLocker(documentType, documentNumber);
      if (response.success) {
        setDigiLockerVerified(true);
        setSuccess('Document verification successful!');
        loadVerificationStatus();
        
        // If both verifications are complete, redirect to dashboard
        if (aadhaarVerified) {
          setTimeout(() => {
            navigate('/student/dashboard');
          }, 2000);
        }
      }
    } catch (error) {
      setError(error.message || 'Document verification failed');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'failed':
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Clock className="w-6 h-6 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Student Verification
          </h1>
          <p className="text-gray-600">
            Complete your verification to access scholarship opportunities
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep >= 1 ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 text-gray-400'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep >= 2 ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 text-gray-400'
            }`}>
              2
            </div>
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        {/* Step 1: Aadhaar Verification */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <Fingerprint className="w-6 h-6 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold">Step 1: Aadhaar Verification</h2>
              {aadhaarVerified && <CheckCircle className="w-6 h-6 text-green-500 ml-2" />}
            </div>

            {!aadhaarVerified ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aadhaar Number
                  </label>
                  <input
                    type="text"
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                    placeholder="Enter 12-digit Aadhaar number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    maxLength={12}
                  />
                </div>

                {!otpSent ? (
                  <button
                    onClick={handleSendOTP}
                    disabled={loading || aadhaarNumber.length !== 12}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending OTP...' : 'Send OTP'}
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        OTP
                      </label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="Enter 6-digit OTP"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        maxLength={6}
                      />
                    </div>
                    <button
                      onClick={handleVerifyAadhaar}
                      disabled={loading || otp.length !== 6}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Verifying...' : 'Verify Aadhaar'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-4">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                <p className="text-green-600 font-medium">Aadhaar verification completed!</p>
              </div>
            )}
          </div>
        )}

        {/* Step 2: DigiLocker Verification */}
        {currentStep === 2 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold">Step 2: Document Verification</h2>
              {digiLockerVerified && <CheckCircle className="w-6 h-6 text-green-500 ml-2" />}
            </div>

            {!digiLockerVerified ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document Type
                  </label>
                  <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select document type</option>
                    <option value="10th_certificate">10th Certificate</option>
                    <option value="12th_certificate">12th Certificate</option>
                    <option value="degree_certificate">Degree Certificate</option>
                    <option value="income_certificate">Income Certificate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document Number
                  </label>
                  <input
                    type="text"
                    value={documentNumber}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                    placeholder="Enter document number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={handleVerifyDigiLocker}
                  disabled={loading || !documentType || !documentNumber}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Verifying...' : 'Verify Document'}
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                <p className="text-green-600 font-medium">Document verification completed!</p>
              </div>
            )}
          </div>
        )}

        {/* Verification Status */}
        {verificationData && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Verification Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <Fingerprint className="w-5 h-5 text-green-600 mr-2" />
                  Aadhaar Verification
                </span>
                {getStatusIcon(aadhaarVerified ? 'verified' : 'pending')}
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <FileText className="w-5 h-5 text-green-600 mr-2" />
                  Document Verification
                </span>
                {getStatusIcon(digiLockerVerified ? 'verified' : 'pending')}
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <Shield className="w-5 h-5 text-green-600 mr-2" />
                  Overall Status
                </span>
                {getStatusIcon(verificationStatus)}
              </div>
            </div>
          </div>
        )}

        {/* Demo Instructions */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Demo Instructions:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Use any 12-digit number for Aadhaar</li>
            <li>• OTP is always: <strong>123456</strong></li>
            <li>• Use any document number for DigiLocker</li>
            <li>• This is a mock implementation for demo purposes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentVerification; 