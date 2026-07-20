/**
 * Firebase auth public surface.
 * Prefer importing leaf modules directly from screens to avoid Metro circular-init issues:
 * - ./phoneAuth
 * - ./phoneAuthErrors
 * - ./authSession
 */
export {
  getFirebaseCurrentUser,
  signOutFirebaseUser,
  waitForFirebaseCurrentUser,
} from './authSession';
export { sendPhoneOtp, verifyPhoneOtp } from './phoneAuth';
export type { FirebaseAuthErrorDetails } from './phoneAuthErrors';
export {
  getPhoneAuthErrorMessage,
  getPhoneAuthErrorTitle,
  handlePhoneAuthError,
  logFirebaseAuthError,
  parseFirebaseAuthError,
} from './phoneAuthErrors';
