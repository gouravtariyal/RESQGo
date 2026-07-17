import { Alert } from 'react-native';

export type FirebaseAuthErrorDetails = {
  code: string;
  message: string;
  stack?: string;
  raw: unknown;
};

/**
 * Normalizes unknown Firebase / native errors into a consistent shape.
 */
export function parseFirebaseAuthError(
  error: unknown,
): FirebaseAuthErrorDetails {
  if (typeof error === 'object' && error !== null) {
    const candidate = error as {
      code?: unknown;
      message?: unknown;
      stack?: unknown;
      nativeErrorMessage?: unknown;
      userInfo?: { message?: unknown };
    };

    const code =
      typeof candidate.code === 'string' && candidate.code.length > 0
        ? candidate.code
        : 'auth/unknown';

    const messageFromObject =
      (typeof candidate.message === 'string' && candidate.message) ||
      (typeof candidate.nativeErrorMessage === 'string' &&
        candidate.nativeErrorMessage) ||
      (typeof candidate.userInfo?.message === 'string' &&
        candidate.userInfo.message) ||
      undefined;

    return {
      code,
      message: messageFromObject || 'An unexpected authentication error occurred.',
      stack: typeof candidate.stack === 'string' ? candidate.stack : undefined,
      raw: error,
    };
  }

  return {
    code: 'auth/unknown',
    message: String(error),
    raw: error,
  };
}

/**
 * Logs the complete Firebase error object for debugging.
 */
export function logFirebaseAuthError(context: string, error: unknown): void {
  const details = parseFirebaseAuthError(error);

  console.log(`[FirebaseAuth:${context}] complete error object:`, error);
  console.log(`[FirebaseAuth:${context}] details:`, {
    code: details.code,
    message: details.message,
    stack: details.stack,
  });
}

/**
 * Converts Firebase Auth error codes into clear, user-facing messages.
 */
export function getPhoneAuthErrorMessage(
  error: unknown,
  fallbackMessage = 'Something went wrong. Please try again.',
): string {
  const { code, message } = parseFirebaseAuthError(error);

  switch (code) {
    case 'auth/invalid-phone-number':
      return 'Please enter a valid phone number.';
    case 'auth/missing-phone-number':
      return 'Phone number is required to continue.';
    case 'auth/invalid-verification-code':
      return 'The OTP you entered is invalid. Please try again.';
    case 'auth/code-expired':
    case 'auth/invalid-verification-id':
    case 'auth/session-expired':
      return 'This OTP has expired. Please request a new code.';
    case 'auth/network-request-failed':
      return 'Unable to connect. Check your internet connection and try again.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a moment before trying again.';
    case 'auth/quota-exceeded':
      return 'OTP service is temporarily unavailable. Please try again later.';
    case 'auth/captcha-check-failed':
      return 'Security verification failed. Please try again.';
    case 'auth/app-not-authorized':
    case 'auth/missing-client-identifier':
    case 'auth/missing-app-credential':
    case 'auth/invalid-app-credential':
      return 'Phone authentication is not configured correctly for this app.';
    case 'auth/operation-not-allowed':
      return 'Phone authentication is disabled for this Firebase project.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/internal-error':
      return message.includes('BILLING_NOT_ENABLED')
        ? 'Firebase billing is not enabled for this project. Enable Blaze plan to send SMS OTPs.'
        : message;
    default:
      return message || fallbackMessage;
  }
}

/**
 * Alert title based on the OTP operation that failed.
 */
export function getPhoneAuthErrorTitle(
  operation: 'send' | 'resend' | 'verify',
): string {
  switch (operation) {
    case 'send':
      return 'Unable to send OTP';
    case 'resend':
      return 'Unable to resend OTP';
    case 'verify':
      return 'OTP verification failed';
    default:
      return 'Authentication error';
  }
}

/**
 * Shared OTP error handler:
 * - logs complete Firebase error (code / message / stack)
 * - shows temporary debug Alert with code + message
 * - returns a user-friendly message for inline UI
 *
 * Exported as a function declaration so Metro/CJS consumers always receive a
 * defined binding (avoids `undefined.handlePhoneAuthError` from circular init).
 */
export function handlePhoneAuthError(
  operation: 'send' | 'resend' | 'verify',
  error: unknown,
  options?: {
    showAlert?: boolean;
  },
): string {
  const details = parseFirebaseAuthError(error);
  const friendlyMessage = getPhoneAuthErrorMessage(error);
  const showAlert = options?.showAlert ?? true;

  logFirebaseAuthError(operation, error);

  if (showAlert) {
    // Temporary debug Alert — replace with friendly-only Alert once auth is stable.
    Alert.alert(
      getPhoneAuthErrorTitle(operation),
      `code: ${details.code}\n\nmessage: ${details.message}\n\n${friendlyMessage}`,
    );
  }

  return friendlyMessage;
}
