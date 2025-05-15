import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Banner from '../components/Banner';

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  // Extract the page user came from or set default to "/"
  const from = location.state?.from?.pathname || '/';
  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect to home if user is logged in
    }
  }, [user, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear any previous errors

    try {
      const response = await fetch('http://127.0.0.1:5010/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier: usernameOrEmail, password, from: from }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid credentials. Please try again.');
      }

      const data = await response.json();
      login({ usernameOrEmail, username: data.username }); // Save user data in context
      navigate(data.redirectTo || from); // Redirect to the original page after login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <Banner items={["Home", "Login"]} />
      <div className="h-[70vh] flex items-center justify-center">
        <div className="h-[70vh] flex items-center justify-center ">

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-96 p-8 shadow-xl border border-gray-300 rounded-xl bg-white"
          >
            <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>
            {error && (
              <p className="text-red-500 text-center text-sm font-semibold">
                {error}
              </p>
            )}
            <label className="font-medium text-gray-700">Username or Email:</label>
            <input
              type="text"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your username or email"
            />
            <label className="font-medium text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your password"
            />
            <button
              type="submit"
              className={`bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none ${loading ? 'opacity-75' : ''
                }`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <p className="text-center text-sm text-gray-500 mt-4">
              Don't have an account?{' '}
              <a href="/register" className="text-blue-600 hover:underline">
                Register here
              </a>
            </p>
          </form>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default Login;
