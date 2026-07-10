import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';

// Let's create an interface for our backend's token response structure
interface TokenResponse {
  accessToken: string;
}

let memoryToken: string | null = null;

export const setAccessToken = (token: string | null): void => {
  memoryToken = token;
};

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true, // Crucial: Transmits the HttpOnly refresh token cookie automatically
});

// Request Interceptor: Appends the Access Token to every outgoing request header
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (memoryToken && config.headers) {
      config.headers.Authorization = `Bearer ${memoryToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Catches 401s and automatically executes token renewal
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    console.error('error inside apiclient.ts = ', error);
    const originalRequest = error.config;

    // Check if the error is a 401 Unauthorized and we haven't tried retrying this request yet
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Contact the refresh route. The browser implicitly includes the HttpOnly cookie.
        const response = await axios.post<TokenResponse>(
          'http://localhost:8080/api/v1/auth/refresh',
          {},
          { withCredentials: true }
        );

        const newAccessToken = response.data.accessToken;
        setAccessToken(newAccessToken);

        // Update authorization parameters and retry the primary request
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Both tokens are expired or invalid -> Evict user to authentication screen
        setAccessToken(null);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;