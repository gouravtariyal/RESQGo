import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';

import { GOOGLE_WEB_CLIENT_ID } from '../../config/env';

let isGoogleSignInConfigured = false;

const ensureGoogleSignInConfigured = () => {
  if (isGoogleSignInConfigured) {
    return;
  }

  if (!GOOGLE_WEB_CLIENT_ID.trim()) {
    throw new Error(
      'Google Sign-In is not configured. Add your Firebase Web Client ID in mobile/src/config/env.ts (GOOGLE_WEB_CLIENT_ID), enable Google in Firebase Authentication, and rebuild the app.',
    );
  }

  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID.trim(),
  });

  isGoogleSignInConfigured = true;
};

export class GoogleSignInCancelledError extends Error {
  constructor() {
    super('Google sign-in was cancelled.');
    this.name = 'GoogleSignInCancelledError';
  }
}

/**
 * Signs the user in with Google via Firebase Auth.
 */
export async function signInWithGoogle(): Promise<void> {
  ensureGoogleSignInConfigured();

  if (Platform.OS === 'android') {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  }

  const signInResult = await GoogleSignin.signIn();

  if (signInResult.type !== 'success') {
    throw new GoogleSignInCancelledError();
  }

  const idToken = signInResult.data.idToken;

  if (!idToken) {
    throw new Error('Google did not return an ID token. Check Firebase Google Sign-In setup.');
  }

  const credential = auth.GoogleAuthProvider.credential(idToken);
  await auth().signInWithCredential(credential);
}
