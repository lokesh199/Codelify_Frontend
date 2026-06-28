import React from 'react';
import type { GoogleUser } from '../utils/auth';
import Navbar from './Navbar';

interface DashboardProps {
  user: GoogleUser;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const testApi = async () => {
    const token = localStorage.getItem('auth_token');

    try {
      const res = await fetch('http://localhost:8080/api/dashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('response of /api/me ', res);

      const data = await res.text();
      console.log('data of /api/me ', data);
    } catch (error) {
      console.error('error from /api/me', error);
    }
  };

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <h1>Welcome to the dashboard</h1>
      <button onClick={testApi}>Click Me</button>
    </>
  );
};
