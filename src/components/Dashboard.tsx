import { useAuth } from '../AuthContext';

export function Dashboard(): React.JSX.Element {
  const { user, isAuthenticated, isLoading, logoutUser } = useAuth();

  if (isLoading) {
    return <div>Verifying your identity...</div>;
  }

  console.log('isAuthenticated = ', isAuthenticated);
  console.log('user = ', user);

  if (!isAuthenticated || !user) {
    return <div>Access Denied. Please log in.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome back, {user.name}!</h1>
      <p>Email registered: {user.email}</p>
      <p>Your current platform permission role: <strong>{'admin'}</strong></p>
      
      <button onClick={logoutUser} style={{ marginTop: '20px', color: 'red' }}>
        Logout
      </button>
    </div>
  );
}