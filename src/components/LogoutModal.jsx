import { FaSignOutAlt } from 'react-icons/fa';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4 shadow-xl transform transition-all">
        <div className="flex items-center justify-center mb-4 text-red-600">
          <FaSignOutAlt className="w-12 h-12" />
        </div>
        <h3 className="text-lg font-semibold text-center text-gray-900 mb-2">
          Confirm Logout
        </h3>
        <p className="text-center text-gray-600 mb-6">
          Are you sure you want to logout? You will need to login again to access the system.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal; 