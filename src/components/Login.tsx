import React from 'react';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

export function Login(): React.JSX.Element {
  const { loginWithGoogle } = useGoogleAuth();

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Assessment Platform Login</h2>
      <button 
        onClick={loginWithGoogle} 
        style={{ padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Login with Google
      </button>
    </div>
  );
}