import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBox, FaList, FaPlus, FaExchangeAlt, FaTools, 
         FaBoxes, FaShoppingCart, FaArrowUp, FaArrowDown, 
         FaBell, FaClipboardList, FaChartBar, FaCog, FaUsers, FaSignOutAlt,
         FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';

const Sidebar = ({ isSidebarOpen, user, onLogout, isMobile, onClose }) => {
  const location = useLocation();
  const [openDropdowns, setOpenDropdowns] = useState({
    asset: false,
    inventory: false,
  });
  const [touchStart, setTouchStart] = useState(null);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleDropdown = (key) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;

    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;

    // If swipe is more than 50px, consider it a swipe
    if (diff > 50) {
      // Swipe left - close sidebar
      onClose();
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  const handleNavClick = (to) => {
    if (isMobile) {
      onClose();
    }
  };

  const NavLink = ({ to, icon: Icon, text, badge }) => (
    <Link
      to={to}
      onClick={() => handleNavClick(to)}
      className={`flex items-center p-3 text-white rounded-lg hover:bg-slate-700 transition-colors ${
        isActive(to) ? 'bg-slate-700' : ''
      }`}
    >
      <Icon className={`${isMobile ? 'w-6 h-6' : 'w-5 h-5'} min-w-[1.25rem]`} />
      {(isSidebarOpen || isMobile) && (
        <div className="ml-3 flex items-center justify-between w-full">
          <span className={`${isMobile ? 'text-base' : 'text-sm'}`}>{text}</span>
          {badge && (
            <span className="bg-red-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>
      )}
    </Link>
  );

  const DropdownButton = ({ text, icon: Icon, isOpen, onClick }) => (
    <button
      onClick={onClick}
      className="w-full flex items-center p-3 text-white rounded-lg hover:bg-slate-700 transition-colors"
    >
      <Icon className={`${isMobile ? 'w-6 h-6' : 'w-5 h-5'} min-w-[1.25rem]`} />
      {(isSidebarOpen || isMobile) && (
        <div className="ml-3 flex items-center justify-between w-full">
          <span className={`${isMobile ? 'text-base' : 'text-sm'}`}>{text}</span>
          {isOpen ? <FaChevronDown className="w-4 h-4" /> : <FaChevronRight className="w-4 h-4" />}
        </div>
      )}
    </button>
  );

  return (
    <aside 
      className={`${
        isMobile ? 'w-full' : isSidebarOpen ? 'w-64' : 'w-16'
      } bg-slate-800 shadow-lg transition-all duration-300 ease-in-out flex-shrink-0 flex flex-col h-full touch-pan-y`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex-1 p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
        <div className="space-y-1">
          <NavLink to="/dashboard" icon={FaHome} text="Dashboard" />
          
          {/* Asset Section */}
          <div>
            <DropdownButton 
              text="Asset" 
              icon={FaBox} 
              isOpen={openDropdowns.asset}
              onClick={() => toggleDropdown('asset')}
            />
            <div className={`pl-2 space-y-1 overflow-hidden transition-all duration-200 ${
              openDropdowns.asset ? 'max-h-48' : 'max-h-0'
            }`}>
              <NavLink to="/asset-list" icon={FaList} text="Asset List" />
              <NavLink to="/add-asset" icon={FaPlus} text="Add Asset" />
              <NavLink to="/lease" icon={FaExchangeAlt} text="Lease" />
              <NavLink to="/maintenance" icon={FaTools} text="Maintenance" />
            </div>
          </div>

          {/* Inventory Section */}
          <div>
            <DropdownButton 
              text="Inventory" 
              icon={FaBoxes} 
              isOpen={openDropdowns.inventory}
              onClick={() => toggleDropdown('inventory')}
            />
            <div className={`pl-2 space-y-1 overflow-hidden transition-all duration-200 ${
              openDropdowns.inventory ? 'max-h-48' : 'max-h-0'
            }`}>
              <NavLink to="/inventory-list" icon={FaList} text="Inventory List" />
              <NavLink to="/purchase-order" icon={FaShoppingCart} text="Purchase Order" />
              <NavLink to="/stock-in" icon={FaArrowUp} text="Stock In" />
              <NavLink to="/stock-out" icon={FaArrowDown} text="Stock Out" />
            </div>
          </div>

          {/* Other Sections */}
          <NavLink to="/alerts" icon={FaBell} text="Alerts" badge="9" />
          <NavLink to="/requests" icon={FaClipboardList} text="Requests" />
          <NavLink to="/reports" icon={FaChartBar} text="Reports" />
          
          {/* Setup Section */}
          <NavLink to="/setup" icon={FaCog} text="Setup" />
          <NavLink to="/users" icon={FaUsers} text="Users" />
        </div>
      </div>

      {/* Logout Button - Fixed at bottom */}
      <div className="p-2 border-t border-slate-700">
        <button
          onClick={onLogout}
          className="w-full flex items-center p-3 text-white rounded-lg hover:bg-slate-700 transition-colors"
        >
          <FaSignOutAlt className={`${isMobile ? 'w-6 h-6' : 'w-5 h-5'} min-w-[1.25rem]`} />
          {(isSidebarOpen || isMobile) && (
            <span className={`ml-3 ${isMobile ? 'text-base' : 'text-sm'}`}>Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar; 