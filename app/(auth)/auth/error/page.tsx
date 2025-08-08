'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import Link from 'next/link';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  // Define error messages with explicit type
  type ErrorKey = 'Configuration' | 'AccessDenied' | 'Verification' | 'Default';
  const errorMessages: Record<ErrorKey, string> = {
    Configuration: 'There is a problem with the server configuration. Please try again later or contact support.',
    AccessDenied: 'Access denied. You do not have permission to sign in.',
    Verification: 'The verification token is invalid or has expired.',
    Default: 'An unexpected error occurred. Please try again or contact support.',
  };

  const message = error && error in errorMessages ? errorMessages[error as ErrorKey] : errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card sx={{ width: '100%', maxWidth: 448, boxShadow: 3 }}>
        <CardHeader
          title={
            <Typography variant="h5" align="center" fontWeight="bold">
              Authentication Error
            </Typography>
          }
        />
        <CardContent>
          <Typography color="error" align="center" gutterBottom>
            {message}
          </Typography>
          <Typography align="center" sx={{ mt: 2 }}>
            <Link href="/signin" className="text-blue-600 hover:underline" aria-label="Return to sign-in page">
              Return to Sign In
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
