import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import App from './App.tsx';

// Import Mantine core styles
import '@mantine/core/styles.css';
import './index.css';
import { AuthProvider } from './AuthContext.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { createBrowserRouter, Outlet, Router, RouterProvider } from 'react-router-dom';
import { Dashboard } from './components/Dashboard.tsx';
import { Contest } from './components/Contest.tsx';
import { Leaderboard } from './components/Leaderboard.tsx';
import { Login } from './components/Login.tsx';
import Navbar from './components/Navbar.tsx';

function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/contest",
        element: <Contest />,
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="auto">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </GoogleOAuthProvider>
    </MantineProvider>
  </StrictMode>
);
