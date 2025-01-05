import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { FiEdit2 } from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { confirmLogout } from '../services/auth.service';
import LogoutModal from './LogoutModal';

const Navbar = ({ user, isMobile, isSidebarOpen, onToggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = async () => {
    await confirmLogout(() => {
      setShowLogoutModal(false);
      navigate('/login');
    });
  };

  return (
    <>
      <nav className="bg-white shadow-lg flex-shrink-0 z-50 relative">
        <div className="px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              {isMobile && isSidebarOpen ? (
                <button
                  onClick={onToggleSidebar}
                  className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                  <FaTimes className="h-6 w-6" />
                </button>
              ) : (
                <button
                  onClick={onToggleSidebar}
                  className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
                  title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                  <FaBars className="h-6 w-6" />
                </button>
              )}
              <img 
                src="/img/login/fcu-icon.png" 
                alt="FCU Logo" 
                className="h-8 w-8 ml-3"
              />
              <h1 className="ml-3 text-xl font-semibold text-gray-800">FCU Asset Management</h1>
            </div>
            
            <div className="flex items-center space-x-3 relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 focus:outline-none hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  {user.profile_image ? (
                    <img
                      src={user.profile_image}
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="h-10 w-10 text-gray-400" />
                  )}
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">{`${user.first_name} ${user.last_name}`}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
              </button>

              <div className={`absolute right-0 top-14 w-72 transform transition-all duration-200 ease-out ${
                isDropdownOpen 
                  ? 'opacity-100 translate-y-0 visible' 
                  : 'opacity-0 -translate-y-2 invisible'
              }`}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {user.profile_image ? (
                          <img
                            src={user.profile_image}
                            alt="Profile"
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        ) : (
                          <FaUserCircle className="h-12 w-12 text-gray-400" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900">{`${user.first_name} ${user.last_name}`}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <Link 
                        to="/profile" 
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-150"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <FiEdit2 className="w-4 h-4 text-gray-500" />
                      </Link>
                    </div>
                  </div>
                  <div className="py-2">
                    <div className="px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Role</span>
                        <span className="text-sm font-medium text-gray-900">{user.role?.role}</span>
                      </div>
                    </div>
                    <div className="px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Username</span>
                        <span className="text-sm font-medium text-gray-900">{user.username}</span>
                      </div>
                    </div>
                    <div className="border-t border-gray-100 mt-2">
                      <button
                        onClick={handleLogoutClick}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default Navbar; 