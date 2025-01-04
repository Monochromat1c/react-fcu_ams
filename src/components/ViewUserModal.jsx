import { FaTimes, FaUser } from 'react-icons/fa';

const ViewUserModal = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FaUser className="text-blue-600 w-5 h-5" />
            </div>
            <h2 className="text-lg font-medium text-gray-900">User Details</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Full Name</label>
                <p className="mt-1 text-sm text-gray-900">
                  {user.first_name} {user.middle_name ? `${user.middle_name} ` : ''}{user.last_name}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">Username</label>
                <p className="mt-1 text-sm text-gray-900">{user.username}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <p className="mt-1 text-sm text-gray-900">{user.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">Contact Number</label>
                <p className="mt-1 text-sm text-gray-900">{user.contact_number}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Role</label>
                <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                  user.role.role === 'admin' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {user.role.role}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">Department</label>
                <p className="mt-1 text-sm text-gray-900">{user.department.department}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">Address</label>
                <p className="mt-1 text-sm text-gray-900">{user.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 rounded-b-lg border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal; 