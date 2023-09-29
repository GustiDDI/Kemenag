import React from 'react';
import UserDetails from './userdetail';
import './usercard.css';  // Import the CSS file

const UserCard = ({ user }) => {
  return (
      <div className="user-card">
        <UserDetails user={user} />
      </div>
  );
};

export default UserCard;
