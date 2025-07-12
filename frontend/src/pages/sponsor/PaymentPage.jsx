import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { sponsorAPI } from '../../services/api';
import { 
  CreditCard, 
  IndianRupee, 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertCircle,
  ArrowLeft,
  Shield,
  Lock,
  RefreshCw,
  Calendar,
  Award
} from 'lucide-react';

const PaymentPage = () => {
  const { scholarshipId } = useParams();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [paymentDetails, setPaymentDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchScholarshipDetails();
  }, [scholarshipId]);

  const fetchScholarshipDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Validate scholarshipId
      if (!scholarshipId) {
        setError('Invalid scholarship ID');
        return;
      }
      
      console.log('🔍 Fetching scholarship with ID:', scholarshipId);
      const data = await sponsorAPI.getScholarshipById(scholarshipId);
      
      if (data.success) {
        setScholarship(data.scholarship);
        console.log('✅ Scholarship loaded successfully:', data.scholarship.title);
      } else {
        setError(data.message || 'Scholarship not found');
      }
    } catch (error) {
      console.error('❌ Error fetching scholarship:', error);
      if (error.message.includes('404') || error.message.includes('not found')) {
        setError('This scholarship does not exist or you do not have permission to access it.');
      } else if (error.message.includes('Empty response') || error.message.includes('Invalid response')) {
        setError('Service is temporarily unavailable. Please try again in a moment.');
      } else {
        setError(error.message || 'Failed to load scholarship details. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentDetailsChange = (field, value) => {
    setPaymentDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validatePaymentDetails = () => {
    switch (paymentMethod) {
      case 'upi':
        return paymentDetails.upiId && paymentDetails.upiId.includes('@');
      case 'card':
        return paymentDetails.cardNumber && paymentDetails.expiryMonth && 
               paymentDetails.expiryYear && paymentDetails.cvv;
      case 'netbanking':
        return paymentDetails.bankName && paymentDetails.accountNumber;
      default:
        return false;
    }
  };

  const handlePayment = async () => {
    if (!validatePaymentDetails()) {
      setError('Please fill in all required payment details');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          scholarshipId,
          paymentMethod,
          paymentDetails
        })
      });

      const data = await response.json();
      if (data.success) {
        setPaymentStatus(data.payment);
        // Poll for payment status
        pollPaymentStatus(data.payment.id);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      setError('Failed to process payment');
    } finally {
      setProcessing(false);
    }
  };

  const pollPaymentStatus = async (paymentId) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/payments/status/${paymentId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setPaymentStatus(data.payment);
          if (data.payment.status === 'completed' || data.payment.status === 'failed') {
            clearInterval(pollInterval);
            if (data.payment.status === 'completed') {
              setTimeout(() => {
                navigate('/sponsor/scholarships');
              }, 3000);
            }
          }
        }
      } catch (error) {
        console.error('Error polling payment status:', error);
      }
    }, 2000);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'processing':
        return <RefreshCw className="w-6 h-6 text-blue-500 animate-spin" />;
      case 'pending':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <AlertCircle className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'processing':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 text-green-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (error && !scholarship) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 mb-2">{error}</p>
            <p className="text-gray-500 text-sm mb-4">
              This scholarship may not exist or may not belong to your account.
            </p>
            <div className="space-x-4">
              <button 
                onClick={() => navigate('/sponsor/scholarships')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                View My Scholarships
              </button>
              <button 
                onClick={() => navigate('/sponsor/create')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create New Scholarship
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalAmount = scholarship ? scholarship.amount * scholarship.numberOfAwards : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={() => navigate('/sponsor/scholarships')}
              className="flex items-center text-green-600 hover:text-green-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Scholarships
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Payment</h1>
          <p className="text-gray-600">Pay for your scholarship to make it active for students</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scholarship Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Scholarship Details</h2>
            
            {scholarship && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">{scholarship.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{scholarship.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Amount per Student</p>
                    <p className="text-lg font-semibold text-green-600 flex items-center">
                      <IndianRupee className="w-4 h-4 mr-1" />
                      {scholarship.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Number of Awards</p>
                    <p className="text-lg font-semibold text-gray-900 flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      {scholarship.numberOfAwards}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-bold text-green-600 flex items-center">
                      <IndianRupee className="w-5 h-5 mr-1" />
                      {totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>

            {paymentStatus ? (
              /* Payment Status */
              <div className="text-center py-8">
                {getStatusIcon(paymentStatus.status)}
                <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
                  Payment {paymentStatus.status}
                </h3>
                <p className="text-gray-600 mb-4">
                  {paymentStatus.status === 'completed' && 'Your payment was successful! The scholarship is now active.'}
                  {paymentStatus.status === 'processing' && 'Your payment is being processed. Please wait...'}
                  {paymentStatus.status === 'failed' && 'Payment failed. Please try again.'}
                </p>
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(paymentStatus.status)}`}>
                  {paymentStatus.status.charAt(0).toUpperCase() + paymentStatus.status.slice(1)}
                </div>
                {paymentStatus.transactionId && (
                  <p className="text-xs text-gray-500 mt-2">
                    Transaction ID: {paymentStatus.transactionId}
                  </p>
                )}
              </div>
            ) : (
              /* Payment Form */
              <div className="space-y-6">
                {/* Payment Method Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Choose Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'upi', label: 'UPI', icon: '💳' },
                      { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
                      { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
                      { id: 'wallet', label: 'Digital Wallet', icon: '📱' }
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 border rounded-lg text-left transition-colors ${
                          paymentMethod === method.id
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{method.icon}</span>
                          <span className="font-medium">{method.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Details */}
                <div>
                  {paymentMethod === 'upi' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        placeholder="username@bank"
                        value={paymentDetails.upiId || ''}
                        onChange={(e) => handlePaymentDetailsChange('upiId', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">Example: john.doe@okicici</p>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={paymentDetails.cardNumber || ''}
                          onChange={(e) => handlePaymentDetailsChange('cardNumber', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Month
                          </label>
                          <select
                            value={paymentDetails.expiryMonth || ''}
                            onChange={(e) => handlePaymentDetailsChange('expiryMonth', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="">MM</option>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                              <option key={month} value={month.toString().padStart(2, '0')}>
                                {month.toString().padStart(2, '0')}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Year
                          </label>
                          <select
                            value={paymentDetails.expiryYear || ''}
                            onChange={(e) => handlePaymentDetailsChange('expiryYear', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="">YYYY</option>
                            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                              <option key={year} value={year}>{year}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            maxLength="4"
                            value={paymentDetails.cvv || ''}
                            onChange={(e) => handlePaymentDetailsChange('cvv', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bank Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter bank name"
                          value={paymentDetails.bankName || ''}
                          onChange={(e) => handlePaymentDetailsChange('bankName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Account Number
                        </label>
                        <input
                          type="text"
                          placeholder="Enter account number"
                          value={paymentDetails.accountNumber || ''}
                          onChange={(e) => handlePaymentDetailsChange('accountNumber', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'wallet' && (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">📱</div>
                      <p className="text-gray-600">Digital wallet integration coming soon!</p>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <XCircle className="w-5 h-5 text-red-500" />
                      <p className="text-red-700">{error}</p>
                    </div>
                  </div>
                )}

                {/* Security Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">Secure Payment</h4>
                      <p className="text-sm text-blue-800">
                        Your payment information is encrypted and secure. We use industry-standard security protocols to protect your data.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handlePayment}
                  disabled={processing || !validatePaymentDetails() || paymentMethod === 'wallet'}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {processing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Processing Payment...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Lock className="w-5 h-5" />
                      <span>Pay ₹{totalAmount.toLocaleString()}</span>
                    </div>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage; 