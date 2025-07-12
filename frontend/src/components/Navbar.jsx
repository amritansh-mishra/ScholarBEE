import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/scholarbee-logo.png';
import { 
  LogOut, 
  User, 
  Bell, 
  Home, 
  FileText, 
  PlusCircle, 
  Settings,
  Award,
  Users,
  BookOpen,
  Info,
  Mail,
  Wallet,
  CreditCard
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getNavItems = () => {
    if (user?.role === 'student') {
      return [
        { to: '/student/dashboard', icon: Home, label: 'Dashboard' },
        { to: '/student/wallet', icon: Wallet, label: 'Wallet' },
        { to: '/student/applications', icon: FileText, label: 'My Applications' },
        { to: '/student/profile', icon: User, label: 'Profile' },
      ];
    } else if (user?.role === 'sponsor') {
      return [
        { to: '/sponsor/dashboard', icon: Home, label: 'Dashboard' },
        { to: '/sponsor/create', icon: PlusCircle, label: 'Create Scholarship' },
        { to: '/sponsor/scholarships', icon: Award, label: 'My Scholarships' },
        { to: '/sponsor/payments', icon: CreditCard, label: 'Payments' },
        { to: '/sponsor/profile', icon: Settings, label: 'Profile' },
      ];
    }
    return [];
  };

  const publicNavItems = [
    { to: '/courses', icon: BookOpen, label: 'Courses' },
    { to: '/about', icon: Info, label: 'About' },
    { to: '/contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={user ? (user.role === 'student' ? '/student/dashboard' : '/sponsor/dashboard') : '/'} 
                  className="flex items-center space-x-3">
              <img src={logo} alt="ScholarBEE Logo" className="w-10 h-10 rounded-xl object-contain shadow-lg" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">ScholarBEE</span>
                <span className="text-xs text-green-600 font-medium -mt-1">Empowering Education</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              // Authenticated user navigation
              <>
                {getNavItems().map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      location.pathname === item.to
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </>
            ) : (
              // Public navigation
              <>
                {publicNavItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      location.pathname === item.to
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button className="relative p-2 text-gray-600 hover:text-green-600 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center space-x-3">
                  {user.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-green-600" />
                    </div>
                  )}
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-600 capitalize">{user.role}</p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-green-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/student/signup"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-green-200 bg-white/50">
        <div className="px-4 py-2 space-y-1">
          {user ? (
            getNavItems().map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.to
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))
          ) : (
            publicNavItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.to
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;