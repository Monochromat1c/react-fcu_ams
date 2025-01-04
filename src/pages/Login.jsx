import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // TODO: Implement login logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      console.log('Login attempt:', formData);
    } catch (err) {
      setError('Invalid username or password');
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
        <div className="bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-lg w-full max-w-md">
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
                className="w-full pl-10 pr-4 py-3 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full pl-10 pr-4 py-3 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                aria-label="Password"
                autoComplete="current-password"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 py-2 px-3 rounded-lg" role="alert">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors relative disabled:bg-blue-400"
              disabled={isLoading}
            >
              <span className={`${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                Sign In
              </span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
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