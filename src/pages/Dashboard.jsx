import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminDashboard from '../components/AdminDashboard';
import UserDashboard from '../components/UserDashboard';
import LogoutModal from '../components/LogoutModal';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';

const Dashboard = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    if (children) {
      return children;
    }
    
    if (location.pathname === '/users') {
      return null;
    }
    
    return user.role.role === 'admin' ? <AdminDashboard /> : <UserDashboard />;
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {/* Logout Modal */}
      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />

      {/* Navbar */}
      <Navbar 
        user={user}
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
      />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile Overlay */}
        {isMobile && isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar Container */}
        <div className={`
          ${isMobile ? 'fixed inset-0 top-16 z-40' : 'relative'}
          transform transition-transform duration-300 ease-in-out
          ${!isSidebarOpen && isMobile ? '-translate-x-full' : 'translate-x-0'}
          ${isMobile ? 'w-full' : ''}
        `}>
          <Sidebar 
            isSidebarOpen={isSidebarOpen} 
            user={user} 
            onLogout={handleLogoutClick}
            isMobile={isMobile}
            onClose={toggleSidebar}
          />
        </div>

        {/* Main Content */}
        <main className={`
          flex-1 overflow-x-hidden overflow-y-auto bg-gray-100
          ${isMobile && isSidebarOpen ? 'hidden' : 'block'}
        `}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 