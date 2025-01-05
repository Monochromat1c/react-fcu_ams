import { useState, useEffect } from 'react';
import { FaLaptop, FaClipboardList, FaExclamationTriangle, FaHistory } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { getDashboardStats, getRecentActivities } from '../services';

const UserDashboard = () => {
  const { user: currentUser } = useAuth();
  const [stats, setStats] = useState({
    assignedAssets: 0,
    pendingReturns: 0,
    activeRequests: 0
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
    <div className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Summary Cards */}
        <div className="bg-blue-500 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center">
            <FaLaptop className="text-4xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Assigned Assets</h3>
              <p className="text-2xl font-bold">{stats.assignedAssets}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-4xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Pending Returns</h3>
              <p className="text-2xl font-bold">{stats.pendingReturns}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-500 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center">
            <FaClipboardList className="text-4xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Active Requests</h3>
              <p className="text-2xl font-bold">{stats.activeRequests}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Assets */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">My Assets</h2>
          {error ? (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          ) : stats.assets?.length > 0 ? (
            <div className="space-y-3">
              {stats.assets.map((asset, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{asset.name}</h3>
                      <p className="text-sm text-gray-600">Asset Tag: {asset.tag}</p>
                    </div>
                    <span className={`px-2 py-1 ${
                      asset.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    } text-xs rounded-full`}>
                      {asset.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">No assets assigned</div>
          )}
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

          {/* Quick Actions */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors">
                <FaClipboardList className="mr-2" />
                Request Asset
              </button>
              <button className="flex items-center justify-center p-3 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors">
                <FaHistory className="mr-2" />
                View History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 