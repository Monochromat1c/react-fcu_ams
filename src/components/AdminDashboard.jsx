import { FaUsers, FaBuilding, FaBoxes, FaClipboardList, FaCog, FaChartBar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Summary Cards */}
        <div className="bg-blue-500 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center">
            <FaUsers className="text-4xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-2xl font-bold">150</p>
            </div>
          </div>
        </div>

        <div className="bg-green-500 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center">
            <FaBoxes className="text-4xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Total Assets</h3>
              <p className="text-2xl font-bold">1,234</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-500 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center">
            <FaBuilding className="text-4xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Departments</h3>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/users')}
              className="flex items-center justify-center p-4 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <FaUsers className="mr-2" />
              Manage Users
            </button>
            <button className="flex items-center justify-center p-4 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <FaBoxes className="mr-2" />
              Asset Registry
            </button>
            <button className="flex items-center justify-center p-4 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <FaClipboardList className="mr-2" />
              Reports
            </button>
            <button className="flex items-center justify-center p-4 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <FaCog className="mr-2" />
              Settings
            </button>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm">New asset registered: Laptop Dell XPS 13</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm">User account created: John Doe</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm">Asset transferred: Projector to Room 301</p>
                <p className="text-xs text-gray-500">3 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 