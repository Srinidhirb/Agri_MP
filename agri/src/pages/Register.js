import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import NavBar from '../components/NavBar';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Banner from '../components/Banner';

const registerUser = async (username, email, password, phoneNumber, place) => {
  const response = await fetch('http://127.0.0.1:5010/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password, phone_number: phoneNumber, place }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registration failed');
  }

  return response.json();
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [place, setPlace] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect to home if user is logged in
    }
  }, [user, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setMessage(''); // Clear previous messages

    try {
      const response = await registerUser(username, email, password, phoneNumber, place);
      setMessage(`Success: ${response.message}`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <>
      <NavBar />
      <Banner items={["Home", "Register"]} />
      <div className="h-[60vh] flex items-center justify-center ">
  <div className="w-[60%] p-8 shadow-xl rounded-lg bg-white border border-gray-200">
    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
      Create Your Account
    </h2>
    <form onSubmit={handleRegister} className="flex flex-wrap gap-5">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="p-3 border border-gray-300 w-96 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="p-3 border border-gray-300 w-96 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="p-3 border border-gray-300 w-96 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
        className="p-3 border border-gray-300 w-96 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
      <input
        type="text"
        placeholder="Place"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        required
        className="p-3 border border-gray-300 w-96 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
      <button
        type="submit"
        disabled={isLoading}
        className={`p-3 rounded-md text-white transition-colors ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isLoading ? 'Registering...' : 'Register'}
      </button>
    </form>
    {message && (
      <p
        className={`mt-6 text-center text-sm font-medium ${
          message.startsWith('Success') ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {message}
      </p>
    )}
  </div>
</div>

      <Footer/>
    </>
  );
};

export default Register;
