import React from 'react';
import {
  Container,
  Paper,
  Title,
  Text,
  Stack,
  Group,
  ThemeIcon,
} from '@mantine/core';
import { IconSparkles } from '@tabler/icons-react';
import { GoogleLogin } from '@react-oauth/google';
import { decodeGoogleCredential, type GoogleUser } from '../utils/auth';

interface LoginProps {
  onLogin: (user: GoogleUser, token: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    // Centers the login card vertically and horizontally on the screen
    <Container size="xs" h="100vh" display="flex" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Stack gap="xl" w="100%">
        
        {/* Header Section */}
        <div style={{ textAlign: 'center' }}>
          <Group justify="center" mb="xs">
            <ThemeIcon
              size="xl"
              radius="md"
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan' }}
            >
              <IconSparkles size={24} />
            </ThemeIcon>
          </Group>
          <Title
            order={1}
            fw={900}
            style={{
              fontSize: '2.2rem',
              backgroundImage: 'linear-gradient(45deg, var(--mantine-color-indigo-6), var(--mantine-color-cyan-6))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Welcome to Codelify
          </Title>
          <Text c="dimmed" mt="sm" size="sm">
            Sign in to access your secure developer dashboard
          </Text>
        </div>

        {/* Main Authentication Card */}
        <Paper radius="lg" p="xl" withBorder shadow="md">
          <Stack gap="lg" align="center">
            <Text fw={600} size="md" c="dimmed">
              To continue, please verify your identity
            </Text>

            {/* Google Authentication Button Wrapper */}
            <div style={{ margin: '10px 0', minHeight: '40px', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  if (credentialResponse.credential) {
                    const user = decodeGoogleCredential(credentialResponse.credential);
                    if (user) {
                      console.log('user after decoding google credential ', user);
                      onLogin(user, credentialResponse.credential);
                    } else {
                      alert('Failed to parse Google account credentials.');
                    }
                  }
                }}
                onError={() => {
                  console.error('Google Auth Failed');
                  alert('Google Authentication failed. Please try again.');
                }}
                // Customizes the appearance to seamlessly match the rounded layout
                shape="pill"
                theme="outline"
                size="large"
                width="100%"
                useOneTap
              />
            </div>

            <Text size="xs" c="dimmed" ta="center" style={{ maxWidth: '80%' }}>
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </Text>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};