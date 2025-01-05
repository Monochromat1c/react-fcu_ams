import { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaFileExcel, FaFilter } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { getAssets } from '../services/master.service';

const AssetList = () => {
  const { user } = useAuth();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalAssets, setTotalAssets] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const itemsPerPage = 15;

  useEffect(() => {
    fetchAssets();
  }, [currentPage]);

  const fetchAssets = async () => {
    try {
      console.log('Starting to fetch assets...');
      console.log('Using user token:', user.token);
      
      setLoading(true);
      const response = await getAssets(user.token);
      console.log('Component received response:', JSON.stringify(response, null, 2));
      
      if (!response) {
        console.error('No response received from server');
        setError('No response received from server');
        return;
      }
      
      // Ensure we have an array of assets
      const assetArray = Array.isArray(response.assets) ? response.assets : [];
      console.log('Processed asset array:', JSON.stringify(assetArray, null, 2));
      
      setAssets(assetArray);
      setTotalAssets(response.total || assetArray.length);
      setTotalCost(response.totalCost || 0);
      setError('');
    } catch (err) {
      console.error('Error fetching assets:', err);
      setError(err.message || 'Failed to fetch assets');
      setAssets([]);
      setTotalAssets(0);
      setTotalCost(0);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting to Excel...');
  };

  const handleFilter = () => {
    // Implement filter functionality
    console.log('Opening filter...');
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-full">
      <h1 className="text-2xl font-bold mb-6">Asset</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow">
          <div className="flex items-center">
            <div className="text-xl mr-2">📦</div>
            <div>
              <div className="text-sm text-gray-600">Total Asset</div>
              <div className="text-2xl font-bold">{totalAssets}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow">
          <div className="flex items-center">
            <div className="text-xl mr-2">💰</div>
            <div>
              <div className="text-sm text-gray-600">Total Cost</div>
              <div className="text-2xl font-bold">₱{totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
            <button
              onClick={handleExport}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              <FaFileExcel className="mr-2" />
              Export to Excel
            </button>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleFilter}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                <FaFilter className="mr-2" />
                Filter
              </button>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by Asset Tag ID..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {searchQuery && (
                  <button
                    onClick={handleClear}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="px-4 py-3 text-left">ASSET TAG ID</th>
                  <th className="px-4 py-3 text-left">COST</th>
                  <th className="px-4 py-3 text-left">SUPPLIER</th>
                  <th className="px-4 py-3 text-left">CATEGORY</th>
                  <th className="px-4 py-3 text-left">STATUS</th>
                  <th className="px-4 py-3 text-left">CONDITION</th>
                  <th className="px-4 py-3 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {assets.map((asset) => (
                  <tr key={asset._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{asset.asset_tag_id}</td>
                    <td className="px-4 py-3">₱{asset.cost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td className="px-4 py-3">{asset.supplier_id?.name || '-'}</td>
                    <td className="px-4 py-3">{asset.category_id?.name || '-'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        asset.status_id?.name === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {asset.status_id?.name || 'N/A'}
                      </span>
                    </td>
                    <td className="px-4 py-3">{asset.condition_id?.name || '-'}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center space-x-2">
                        <button className="text-blue-500 hover:text-blue-600">
                          <FaEye />
                        </button>
                        <button className="text-green-500 hover:text-green-600">
                          <FaEdit />
                        </button>
                        <button className="text-red-500 hover:text-red-600">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalAssets)} to{' '}
              {Math.min(currentPage * itemsPerPage, totalAssets)} of {totalAssets} items
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border hover:bg-gray-100 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={currentPage * itemsPerPage >= totalAssets}
                className="px-3 py-1 rounded border hover:bg-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetList;