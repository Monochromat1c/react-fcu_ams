import { useState } from 'react';
import { FaUser, FaLock, FaExclamationCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Types based on database schema
const initialFormData = {
  username: '',
  password: ''
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await login(formData.username, formData.password);
      
      // Navigate based on user role
      if (user.role.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid username or password. Please try again.');
      setFormData(prev => ({ ...prev, password: '' })); // Clear password on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError('');
  };

  return (
    <div className="fixed inset-0 w-screen h-screen"
         style={{
           backgroundImage: 'url("/img/login/bg-2.jpg")',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat'
         }}>
      <div className="w-full h-full flex items-center justify-center px-6">
        <div className="bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-lg w-full max-w-md relative">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center z-50">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 font-medium">Signing in...</p>
              </div>
            </div>
          )}

          <div className="flex flex-col items-center space-y-3">
            <img 
              src="/img/login/fcu-icon.png" 
              alt="FCU Logo" 
              className="w-24 h-24 object-contain"
            />
            <h2 className="text-2xl font-bold text-gray-800">FCU AMS</h2>
            <p className="text-base text-gray-600">Asset Management System</p>
          </div>
          
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && (
              <div 
                className="flex items-center gap-2 p-4 text-sm bg-red-50 border border-red-200 text-red-600 rounded-lg animate-shake" 
                role="alert"
              >
                <FaExclamationCircle className="flex-shrink-0 text-red-500" />
                <p>{error}</p>
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400 text-lg" />
              </div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  error ? 'border-red-300' : 'border-gray-300'
                }`}
                required
                aria-label="Username"
                autoComplete="username"
                disabled={isLoading}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400 text-lg" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  error ? 'border-red-300' : 'border-gray-300'
                }`}
                required
                aria-label="Password"
                autoComplete="current-password"
                disabled={isLoading}
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-400"
              disabled={isLoading}
            >
              Sign In
            </button>
          </form>

          <div className="mt-4 text-center">
            <a 
              href="#" 
              className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                console.log('Forgot password clicked');
              }}
            >
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
