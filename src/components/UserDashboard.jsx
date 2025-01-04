import { FaLaptop, FaClipboardList, FaExclamationTriangle, FaHistory } from 'react-icons/fa';

const UserDashboard = () => {
  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Summary Cards */}
        <div className="bg-blue-500 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center">
            <FaLaptop className="text-4xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Assigned Assets</h3>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-4xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Pending Returns</h3>
              <p className="text-2xl font-bold">1</p>
            </div>
          </div>
        </div>

        <div className="bg-green-500 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center">
            <FaClipboardList className="text-4xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Active Requests</h3>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Assets */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">My Assets</h2>
          <div className="space-y-3">
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">Dell Latitude 5420</h3>
                  <p className="text-sm text-gray-600">Asset Tag: LAP-2024-001</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
              </div>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">HP Monitor 27"</h3>
                  <p className="text-sm text-gray-600">Asset Tag: MON-2024-003</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
              </div>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">Logitech MX Keys</h3>
                  <p className="text-sm text-gray-600">Asset Tag: KEY-2024-007</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Due Return</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm">Requested new monitor</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm">Asset received: Dell Latitude 5420</p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm">Return notification: Logitech MX Keys</p>
                <p className="text-xs text-gray-500">1 week ago</p>
              </div>
            </div>
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