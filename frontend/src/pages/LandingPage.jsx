import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/scholarbee-logo.png';
import { 
  Award, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap, 
  Heart,
  ArrowRight,
  Star,
  CheckCircle,
  Play,
  Sparkles
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-emerald-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-green-100 to-emerald-100 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="ScholarBEE Logo" className="w-12 h-12 rounded-2xl object-contain shadow-lg" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">ScholarBEE</span>
                <span className="text-xs text-green-600 font-medium -mt-1">Empowering Education</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link
                to="/login"
                className="text-gray-700 hover:text-green-700 font-medium transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/student/signup"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">


            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight">
              Empowering
              <span className="text-green-600">
                {' '}Learning
              </span>
              <br />
              <span className="text-emerald-600">
                Through Rewards
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
              Transform your educational journey with instant UPI-powered micro-scholarships. 
              Earn rewards for every milestone while building your future.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
              <Link
                to="/student/signup"
                className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-3"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/sponsor/signup"
                className="group bg-white/80 backdrop-blur-sm text-gray-700 px-10 py-4 rounded-2xl font-semibold text-lg border border-green-200 hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-3"
              >
                <span>Become a Sponsor</span>
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </Link>
            </div>

            {/* Video Preview */}
            <div className="relative max-w-2xl mx-auto mb-16">
              <div className="bg-white/70 backdrop-blur-sm border border-green-200 rounded-3xl p-8">
                <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
                <p className="text-gray-700 text-center mt-4">Watch how ScholarBEE works</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-3 group-hover:scale-110 transition-transform">10K+</div>
                <div className="text-gray-700">Students Empowered</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-3 group-hover:scale-110 transition-transform">₹50L+</div>
                <div className="text-gray-700">Rewards Distributed</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-green-500 mb-3 group-hover:scale-110 transition-transform">500+</div>
                <div className="text-gray-700">Partner Organizations</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-emerald-500 mb-3 group-hover:scale-110 transition-transform">95%</div>
                <div className="text-gray-700">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-green-600">ScholarBEE</span>?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our platform revolutionizes education funding with AI-driven matching, 
              instant rewards, and transparent impact tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-green-200 hover:border-green-300 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Instant UPI Payouts</h3>
              <p className="text-gray-700 leading-relaxed">
                Verified achievements trigger immediate financial rewards directly to your UPI account. 
                No waiting, no paperwork.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-green-200 hover:border-green-300 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Milestone-Based Learning</h3>
              <p className="text-gray-700 leading-relaxed">
                Earn rewards for completing courses, projects, and skill development milestones. 
                Every achievement matters.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-green-200 hover:border-green-300 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">AI-Powered Verification</h3>
              <p className="text-gray-700 leading-relaxed">
                Advanced AI ensures authentic submissions and prevents fraud, maintaining 
                platform integrity for all users.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-green-200 hover:border-green-300 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Community Impact</h3>
              <p className="text-gray-700 leading-relaxed">
                Connect with like-minded learners, mentors, and sponsors in a supportive 
                ecosystem focused on growth.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-green-200 hover:border-green-300 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Transparent Donations</h3>
              <p className="text-gray-700 leading-relaxed">
                Sponsors get real-time updates on student progress and impact, 
                ensuring every rupee creates meaningful change.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-green-200 hover:border-green-300 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Star className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-green-900 mb-4">Gamified Experience</h3>
              <p className="text-green-700 leading-relaxed">
                Earn badges, climb leaderboards, and build your reputation while 
                developing valuable skills and knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="relative py-32 bg-gradient-to-br from-green-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-green-900 mb-6">How It Works</h2>
            <p className="text-xl text-green-700">Simple steps to start earning rewards for your learning journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/25">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-semibold text-green-900 mb-4">Sign Up & Complete Profile</h3>
              <p className="text-green-700 leading-relaxed">
                Create your account, complete your profile with educational details, 
                and connect your UPI for instant rewards.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/25">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-semibold text-green-900 mb-4">Choose & Complete Milestones</h3>
              <p className="text-green-700 leading-relaxed">
                Browse available scholarships, select milestones that match your goals, 
                and complete the required tasks or courses.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-amber-500/25">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-semibold text-green-900 mb-4">Get Instant Rewards</h3>
              <p className="text-green-700 leading-relaxed">
                Submit your achievements for AI verification. Once approved, 
                receive instant UPI payments and continue your learning journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-green-700 mb-10 max-w-2xl mx-auto">
              Join thousands of students who are already earning rewards while building their future. 
              Start your journey today!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                to="/student/signup"
                className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-3"
              >
                <span>Join as Student</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/sponsor/signup"
                className="group bg-white text-green-700 px-10 py-4 rounded-2xl font-semibold text-lg border border-green-200 hover:bg-green-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-3"
              >
                <span>Become a Sponsor</span>
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-green-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <img src={logo} alt="ScholarBEE Logo" className="w-10 h-10 rounded-xl object-contain shadow-lg" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">ScholarBEE</span>
                <span className="text-xs text-green-200 font-medium -mt-1">Empowering Education</span>
              </div>
            </div>
            <p className="text-green-100 mb-6">
              Empowering students through micro-scholarships and instant rewards
            </p>
            <div className="flex justify-center space-x-8 text-sm">
              <Link to="/about" className="text-green-200 hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="text-green-200 hover:text-white transition-colors">Contact</Link>
              <Link to="/courses" className="text-green-200 hover:text-white transition-colors">Courses</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;