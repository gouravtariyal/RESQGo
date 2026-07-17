import {
  PhoneAuthProvider,
  getAuth,
  signInWithCredential,
  signInWithPhoneNumber,
} from '@react-native-firebase/auth';

type FirebaseAuthError = {
  code?: string;
};

/**
 * Starts Firebase phone authentication and returns the serializable verification ID.
 */
export const sendPhoneOtp = async (phoneNumber: string): Promise<string> => {
  const confirmation = await signInWithPhoneNumber(getAuth(), phoneNumber);
  return confirmation.verificationId;
};

/**
 * Verifies an SMS code and signs the user in with the resulting phone credential.
 */
export const verifyPhoneOtp = async (
  verificationId: string,
  otp: string,
): Promise<void> => {
  const credential = PhoneAuthProvider.credential(verificationId, otp);
  await signInWithCredential(getAuth(), credential);
};

/**
 * Converts Firebase Auth error codes into safe, user-facing messages.
 */
export const getPhoneAuthErrorMessage = (
  error: unknown,
  fallbackMessage: string,
): string => {
  const errorCode =
    typeof error === 'object' && error !== null
      ? (error as FirebaseAuthError).code
      : undefined;

  switch (errorCode) {
    case 'auth/invalid-phone-number':
      return 'Please enter a valid phone number.';
    case 'auth/invalid-verification-code':
      return 'The OTP you entered is invalid. Please try again.';
    case 'auth/invalid-verification-id':
    case 'auth/session-expired':
      return 'This OTP has expired. Please request a new code.';
    case 'auth/network-request-failed':
      return 'Unable to connect. Check your internet connection and try again.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait before trying again.';
    case 'auth/quota-exceeded':
      return 'OTP service is temporarily unavailable. Please try again later.';
    case 'auth/app-not-authorized':
    case 'auth/missing-client-identifier':
      return 'Phone authentication is not configured correctly for this app.';
    default:
      return fallbackMessage;
  }
};
