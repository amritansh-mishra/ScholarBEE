import React, { useState, useCallback } from 'react';
import { 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  FileText, 
  Eye,
  RefreshCw,
  Info
} from 'lucide-react';

export default function AIDocumentChecker({ 
  onVerificationComplete, 
  acceptedTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'],
  maxSize = 5 * 1024 * 1024, // 5MB
  documentType,
  required = false
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState(null);

  const simulateAIVerification = async (file) => {
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
    const fileName = file.name.toLowerCase();
    const fileSize = file.size;
    let isVerified = true;
    let confidenceScore = 85 + Math.random() * 15;
    let verificationReason = 'Document appears authentic with valid metadata and structure.';
    if (fileName.includes('fake') || fileName.includes('test')) {
      isVerified = false;
      confidenceScore = 20 + Math.random() * 30;
      verificationReason = 'Document contains suspicious patterns or metadata inconsistencies.';
    } else if (fileSize < 50000) {
      confidenceScore = 60 + Math.random() * 20;
      verificationReason = 'Document verified but with lower confidence due to file characteristics.';
    } else if (fileName.includes('resume') || fileName.includes('cv')) {
      confidenceScore = 90 + Math.random() * 10;
      verificationReason = 'Resume format and content structure verified as authentic.';
    }
    return {
      isVerified: confidenceScore > 70,
      confidenceScore: Math.round(confidenceScore),
      verificationReason,
      documentType,
      timestamp: new Date().toISOString()
    };
  };

  const handleFileUpload = useCallback(async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setError(null);
    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
      return;
    }
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      setError(`File type not supported. Accepted types: ${acceptedTypes.join(', ')}`);
      return;
    }
    setIsUploading(true);
    setUploadedFile(file);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsUploading(false);
      setIsVerifying(true);
      const result = await simulateAIVerification(file);
      setVerificationResult(result);
      setIsVerifying(false);
      onVerificationComplete(result);
    } catch (err) {
      setError('Upload failed. Please try again.');
      setIsUploading(false);
      setIsVerifying(false);
    }
  }, [maxSize, acceptedTypes, documentType, onVerificationComplete]);

  const getStatusIcon = () => {
    if (isVerifying) return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />;
    if (!verificationResult) return null;
    if (verificationResult.isVerified) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    } else {
      return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusColor = () => {
    if (isVerifying) return 'border-blue-300 bg-blue-50';
    if (!verificationResult) return 'border-gray-300';
    if (verificationResult.isVerified) {
      return 'border-green-300 bg-green-50';
    } else {
      return 'border-red-300 bg-red-50';
    }
  };

  const getConfidenceColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <label className="block text-sm font-medium text-gray-700">
          {documentType} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="group relative">
          <Info className="w-4 h-4 text-gray-400 cursor-help" />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
            AI automatically verifies document authenticity
          </div>
        </div>
      </div>
      <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${getStatusColor()}`}>
        {!uploadedFile ? (
          <>
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Upload your {documentType.toLowerCase()}
            </p>
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              id={`file-upload-${documentType}`}
              accept={acceptedTypes.join(',')}
              disabled={isUploading || isVerifying}
            />
            <label
              htmlFor={`file-upload-${documentType}`}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors disabled:opacity-50"
            >
              Choose File
            </label>
            <p className="text-xs text-gray-500 mt-2">
              Supported: {acceptedTypes.join(', ')} (Max {maxSize / (1024 * 1024)}MB)
            </p>
          </>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3">
              <FileText className="w-6 h-6 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">{uploadedFile.name}</span>
              {getStatusIcon()}
            </div>
            {isUploading && (
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="text-sm">Uploading...</span>
              </div>
            )}
            {isVerifying && (
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="text-sm">AI Verification in progress...</span>
              </div>
            )}
            {verificationResult && (
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <span className={`text-sm font-medium ${verificationResult.isVerified ? 'text-green-600' : 'text-red-600'}`}>
                    {verificationResult.isVerified ? 'Verified' : 'Verification Failed'}
                  </span>
                  <span className={`text-sm font-bold ${getConfidenceColor(verificationResult.confidenceScore)}`}>
                    {verificationResult.confidenceScore}%
                  </span>
                </div>
                <p className="text-xs text-gray-600 max-w-md mx-auto">
                  {verificationResult.verificationReason}
                </p>
                {!verificationResult.isVerified && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-3">
                    <div className="flex items-center gap-2 text-red-800">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-sm font-medium">Action Required</span>
                    </div>
                    <p className="text-sm text-red-700 mt-1">
                      Please upload a different document or contact support if you believe this is an error.
                    </p>
                  </div>
                )}
              </div>
            )}
            <button
              onClick={() => {
                setUploadedFile(null);
                setVerificationResult(null);
                setError(null);
              }}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Upload Different File
            </button>
          </div>
        )}
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-center gap-2 text-red-800">
            <XCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Upload Error</span>
          </div>
          <p className="text-sm text-red-700 mt-1">{error}</p>
        </div>
      )}
    </div>
  );
}