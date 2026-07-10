import { useEffect, useState } from 'react';
import apiClient from './apiClient';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function App() {
  const {user, loginUser, isAuthenticated, logoutUser} = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Silently check if the user has a valid refresh cookie active
        const response = await apiClient.post('/api/v1/auth/refresh');
        loginUser(response.data.accessToken);
      } catch (err) {
        // No valid session cookie found; user is unauthenticated safely
        logoutUser();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  if (loading) return <div>Loading secure session...</div>;

  if(!isAuthenticated) {
    return <Navigate to="/login" />
  }

  console.log('user = ', user);

  return (
    <div>
      This is the main protected home page {user?.email}.
      <br />
      
    </div>
  );
}