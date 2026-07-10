import React from 'react';
import { useGoogleLogin, type CodeResponse } from '@react-oauth/google';
import apiClient, { setAccessToken } from '../apiClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

interface LoginResponse {
  accessToken: string;
}

export function Login(): React.JSX.Element {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  
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