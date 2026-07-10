import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import apiClient, { setAccessToken } from "./apiClient";

// properties we expect inside our JWT access token payload
interface UserProfile {
  id: string;
  email: string;
  name: string;
}

// structure of our Context State
interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginUser: (token: string) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Helper function to process token and extract user details
  const loginUser = (token: string) => {
    setAccessToken(token); // Save in axios memory
    try {
      const decoded: UserProfile = jwtDecode(token); // Extract user details from JWT
      setUser(decoded);
    } catch (error) {
      console.error("Failed to decode token:", error);
      logoutUser();
    }
  };

  const logoutUser = async () => {
    try {
        await apiClient.post("/api/v1/auth/logout");
        setAccessToken(null);
        setUser(null);
    } catch (error) {
        console.error("Logout failed:", error);
    }
  };

  // On initial app load (or page refresh), try to silently refresh the session
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await apiClient.post<{ accessToken: string }>('/api/v1/auth/refresh');
        loginUser(response.data.accessToken);
      } catch (error) {
        // Safe to ignore: No active cookie session exists
        console.error('error in auth provider. ', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Custom hook to easily grab auth data anywhere in the app
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
