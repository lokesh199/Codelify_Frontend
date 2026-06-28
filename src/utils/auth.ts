export interface GoogleUser {
  sub: string;
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
}

/**
 * Decodes a Google JWT Credential string (ID Token) to extract the user's profile details.
 * Uses standard client-side base64 decoding.
 */
export function decodeGoogleCredential(token: string): GoogleUser | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT token structure');
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload) as GoogleUser;
  } catch (error) {
    console.error('Error decoding Google Credential:', error);
    return null;
  }
}
