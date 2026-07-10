import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useGoogleLogin, type CodeResponse } from "@react-oauth/google";
import apiClient from "../apiClient";

interface LoginResponse {
    accessToken: string;
}

export function useGoogleAuth() {
    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const loginWithGoogle = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async (codeResponse: CodeResponse) => {
            try {
                const response = await apiClient.post<LoginResponse>("/api/v1/auth/google", {
                    code: codeResponse.code
                })

                loginUser(response.data.accessToken);
                alert("Authentication Successful");
                navigate("/dashboard");
            }
            catch(error) {
                console.error("Error while Login with Google", error);
                alert("Login Failed");
            }
        },
        onError: (error) => console.error("Error in Login with Google", error)
    })

    return { loginWithGoogle }
}