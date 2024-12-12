// ProfilePage.js
import React from 'react';
import { useUser } from './UserContext';

const ProfilePage = () => {
  const { user } = useUser(); // Get the user data from context

  return (
    <div>
      <h2>Welcome to your Profile</h2>
      {user ? (
        <pre>{JSON.stringify(user, null, 2)}</pre> // Display user data in JSON format
      ) : (
        <p>No user data available. Please login.</p>
      )}
    </div>
  );
};

export default ProfilePage;
