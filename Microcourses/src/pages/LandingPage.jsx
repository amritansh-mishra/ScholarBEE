import React from 'react';
import { Link } from 'react-router-dom';
import { TypewriterEffectSmooth } from '../components/typewriter-effect';
import { 
  Award, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap, 
  Heart,
  ArrowRight,
  Star,
  CheckCircle
} from 'lucide-react';


const words = [
  { text: "Empowering", className: "!text-black !bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent" },
  { text: "Learning", className: "!text-black" },
  { text: "through", className: "!text-black" },
  { text: "with", className: "!text-black" },
  {
    text: "LearnReward.",
    className: "!text-cyan-600 !bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent",
  },
 
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                LearnReward
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-teal-600 font-semibold transition-colors"
              >
                Login
              </Link>
              <Link
                to="/student/signup"
                className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center text-center mb-4">
              <TypewriterEffectSmooth words={words} />
            </div>
           
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              India's first UPI-powered micro-scholarship platform that rewards students for 
              milestone-based learning achievements with instant financial support.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link
                to="/student/signup"
                className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/sponsor/signup"
                className="bg-white text-teal-600 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-teal-200 hover:border-teal-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                Sponsor Students
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">10K+</div>
                <div className="text-gray-600">Students Empowered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">₹50L+</div>
                <div className="text-gray-600">Rewards Distributed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan-600 mb-2">500+</div>
                <div className="text-gray-600">Partner Organizations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-teal-500 mb-2">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose LearnReward?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform revolutionizes education funding with AI-driven matching, 
              instant rewards, and transparent impact tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-2xl border border-teal-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Instant UPI Payouts</h3>
              <p className="text-gray-600">
                Verified achievements trigger immediate financial rewards directly to your UPI account. 
                No waiting, no paperwork.
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-2xl border border-emerald-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Milestone-Based Learning</h3>
              <p className="text-gray-600">
                Earn rewards for completing courses, projects, and skill development milestones. 
                Every achievement matters.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-8 rounded-2xl border border-cyan-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Verification</h3>
              <p className="text-gray-600">
                Advanced AI ensures authentic submissions and prevents fraud, maintaining 
                platform integrity for all users.
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-100 p-8 rounded-2xl border border-teal-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Impact</h3>
              <p className="text-gray-600">
                Connect with like-minded learners, mentors, and sponsors in a supportive 
                ecosystem focused on growth.
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-100 p-8 rounded-2xl border border-emerald-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Transparent Donations</h3>
              <p className="text-gray-600">
                Sponsors get real-time updates on student progress and impact, 
                ensuring every rupee creates meaningful change.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-teal-100 p-8 rounded-2xl border border-cyan-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Gamified Experience</h3>
              <p className="text-gray-600">
                Earn badges, climb leaderboards, and build your reputation while 
                developing valuable skills and knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to start earning rewards for your learning journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sign Up & Verify</h3>
              <p className="text-gray-600">
                Create your profile, verify your identity, and set up your learning goals 
                to get personalized milestone recommendations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Complete Milestones</h3>
              <p className="text-gray-600">
                Choose from available learning tasks, complete courses, projects, or 
                community contributions to unlock rewards.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Rewarded</h3>
              <p className="text-gray-600">
                Submit your work for AI verification and receive instant UPI payments 
                ranging from ₹500 to ₹1000 per milestone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Learning Journey?
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Join thousands of students already earning rewards for their educational achievements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/student/signup"
              className="bg-white text-teal-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2"
            >
              <span>Start Earning Today</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/sponsor/signup"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-teal-600 transition-all duration-300 transform hover:-translate-y-1"
            >
              Become a Sponsor
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">LearnReward</span>
              </div>
              <p className="text-gray-400">
                Empowering India's students through milestone-based learning rewards and 
                instant financial support.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Students</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/student/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Sponsors</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/sponsor/signup" className="hover:text-white transition-colors">Become a Sponsor</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Impact Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">CSR Partnerships</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 LearnReward. All rights reserved. Made with ❤️ for Indian students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;