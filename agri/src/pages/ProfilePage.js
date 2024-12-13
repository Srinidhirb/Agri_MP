import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../pages/UserContext'; // Assuming you have a UserContext to manage user authentication

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const { user, logout } = useUser(); // Access user state and logout function
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // Redirect to login if user is not logged in
      navigate('/login');
      return;
    }

    // Fetch user details from the backend
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5010/api/home', {
          method: 'GET',
          credentials: 'include', // Ensure cookies (session) are sent
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        const data = await response.json();
        if (data.user_details) {
          setUserDetails(data.user_details);
        } else {
          setError(data.message || 'Something went wrong');
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching user details');
      }
    };

    fetchUserDetails();
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5010/api/logout', {
        method: 'POST',
        credentials: 'include', // Ensure cookies (session) are sent
      });

      if (response.ok) {
        logout(); // Call logout function from context
        navigate('/login'); // Redirect to login page after logout
      } else {
        console.error('Logout failed');
      }
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <div className="profile-page">
      <h1>User Profile</h1>
      {error && <p className="error-message">{error}</p>}
      {userDetails ? (
        <div className="profile-details">
          <p><strong>Username:</strong> {userDetails.username}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Phone Number:</strong> {userDetails.phone_number}</p>
          <p><strong>Place:</strong> {userDetails.place}</p>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default ProfilePage;
