import { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import type { GoogleUser } from './utils/auth';

function App() {
  // Load client ID from localStorage, then fallback to import.meta.env
  const [clientId, setClientId] = useState<string>(() => {
    const saved = localStorage.getItem('custom_google_client_id');
    if (saved) return saved;
    return (import.meta.env.VITE_GOOGLE_CLIENT_ID as string) || '';
  });

  console.log('clientId = ', clientId);

  // Load auth state from localStorage
  const [user, setUser] = useState<GoogleUser | null>(() => {
    const saved = localStorage.getItem('auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('auth_token');
  });

  const handleLogin = (newUser: GoogleUser, newToken: string) => {
    setUser(newUser);
    setToken(newToken);
    console.log('new token = ', newToken);
    localStorage.setItem('auth_user', JSON.stringify(newUser));
    localStorage.setItem('auth_token', newToken);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
  };

  return (
    <GoogleOAuthProvider clientId={clientId || '123456-dummy.apps.googleusercontent.com'}>
      {user && token ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Login
          onLogin={handleLogin}
        />
      )}
    </GoogleOAuthProvider>
  );
}

export default App;
