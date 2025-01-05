import { useState, useEffect } from 'react';
import { FaUsers, FaBuilding, FaBoxes, FaClipboardList, FaCog, FaChartBar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDashboardStats, getRecentActivities } from '../services';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAssets: 0,
    totalDepartments: 0
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, activitiesData] = await Promise.all([
          getDashboardStats(currentUser.token),
          getRecentActivities(currentUser.token)
        ]);
        setStats(statsData);
        setActivities(activitiesData);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard data error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentUser.token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Summary Cards */}
        <div className="bg-blue-500 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center">
            <FaUsers className="text-4xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-500 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center">
            <FaBoxes className="text-4xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Total Assets</h3>
              <p className="text-2xl font-bold">{stats.totalAssets}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-500 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center">
            <FaBuilding className="text-4xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Departments</h3>
              <p className="text-2xl font-bold">{stats.totalDepartments}</p>
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
            {error ? (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            ) : activities.length > 0 ? (
              activities.map((activity, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mr-3 ${activity.color}`}></div>
                  <div>
                    <p className="text-sm">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No recent activities</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 