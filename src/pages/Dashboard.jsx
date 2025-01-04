import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaSignOutAlt, FaUser, FaBars } from 'react-icons/fa';
import AdminDashboard from '../components/AdminDashboard';
import UserDashboard from '../components/UserDashboard';
import LogoutModal from '../components/LogoutModal';
import { useState } from 'react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {/* Logout Modal */}
      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />

      {/* Top Navigation */}
      <nav className="bg-white shadow-lg flex-shrink-0">
        <div className="px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <FaBars className="h-6 w-6" />
              </button>
              <img 
                src="/img/login/fcu-icon.png" 
                alt="FCU Logo" 
                className="h-8 w-8 ml-3"
              />
              <h1 className="ml-3 text-xl font-semibold text-gray-800">FCU Asset Management</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{`${user.first_name} ${user.last_name}`}</p>
                <p className="text-xs text-gray-500">{user.role.role}</p>
              </div>
              <button
                onClick={handleLogoutClick}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={`${
            isSidebarOpen ? 'w-64' : 'w-20'
          } bg-slate-800 shadow-lg transition-all duration-300 ease-in-out flex-shrink-0`}
        >
          <div className="p-4">
            <div className="space-y-4">
              {user.role.role === 'admin' ? (
                // Admin Menu Items
                <div className="space-y-2">
                  <Link
                    to="/users"
                    className={`flex items-center p-2 text-white rounded-lg hover:bg-slate-700 transition-colors ${
                      isActive('/users') ? 'bg-slate-700' : ''
                    }`}
                  >
                    <FaUser className="w-5 h-5" />
                    {isSidebarOpen && <span className="ml-3">Users</span>}
                  </Link>
                  {/* Add more admin menu items */}
                </div>
              ) : (
                // User Menu Items
                <div className="space-y-2">
                  <Link
                    to="/profile"
                    className={`flex items-center p-2 text-white rounded-lg hover:bg-slate-700 transition-colors ${
                      isActive('/profile') ? 'bg-slate-700' : ''
                    }`}
                  >
                    <FaUser className="w-5 h-5" />
                    {isSidebarOpen && <span className="ml-3">My Profile</span>}
                  </Link>
                  {/* Add more user menu items */}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {location.pathname === '/users' ? null : 
            user.role.role === 'admin' ? <AdminDashboard /> : <UserDashboard />
          }
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 