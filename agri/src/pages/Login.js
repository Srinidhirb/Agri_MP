
import React, { useState } from 'react';
import { useUser } from './UserContext';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import NavBar from '../components/NavBar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Get the current location

  // Extract the page user came from or set default to "/"
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy login logic
    const userData = { email, username: email.split('@')[0] }; // Dummy user data
    login(userData); // Save user data in context
    navigate(from); // Redirect to the original page after login
  };


  return (
    <>
      <NavBar />
      <div className="h-[100vh] flex items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96 p-6 shadow-lg">
          <label className="font-bold">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded"
          />
          <label className="font-bold">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
