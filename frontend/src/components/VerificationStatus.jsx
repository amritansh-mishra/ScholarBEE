import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { verificationAPI } from '../services/api';

const VerificationStatus = () => {
  const [verificationData, setVerificationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVerificationStatus();
  }, []);

  const loadVerificationStatus = async () => {
    try {
      const response = await verificationAPI.getStatus();
      if (response.success) {
        setVerificationData(response.data);
      }
    } catch (error) {
      console.error('Failed to load verification status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!verificationData) {
    return null;
  }

  const { verificationStatus, aadhaarVerified, digiLockerVerified } = verificationData;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'verified':
        return 'Verified';
      case 'failed':
        return 'Verification Failed';
      default:
        return 'Pending Verification';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Shield className="w-6 h-6 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Verification Status</h3>
        </div>
        {verificationStatus === 'verified' && (
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
            Complete
          </span>
        )}
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Aadhaar Verification</span>
          {getStatusIcon(aadhaarVerified ? 'verified' : 'pending')}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Document Verification</span>
          {getStatusIcon(digiLockerVerified ? 'verified' : 'pending')}
        </div>
      </div>

      <div className={`p-3 rounded-lg border ${getStatusColor(verificationStatus)}`}>
        <div className="flex items-center">
          {verificationStatus === 'verified' ? (
            <CheckCircle className="w-5 h-5 mr-2" />
          ) : (
            <AlertTriangle className="w-5 h-5 mr-2" />
          )}
          <span className="text-sm font-medium">{getStatusText(verificationStatus)}</span>
        </div>
      </div>

      {verificationStatus !== 'verified' && (
        <div className="mt-4">
          <Link
            to="/student/verification"
            className="block w-full text-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
          >
            Complete Verification
          </Link>
        </div>
      )}
    </div>
  );
};

export default VerificationStatus; 