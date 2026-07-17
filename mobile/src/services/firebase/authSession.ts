import auth from '@react-native-firebase/auth';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';

/**
 * Returns the currently signed-in Firebase user (may be null before Auth restores).
 */
export function getFirebaseCurrentUser(): FirebaseAuthTypes.User | null {
  return auth().currentUser;
}

/**
 * Waits for Firebase Auth to finish restoring any persisted session,
 * then returns auth().currentUser.
 */
export function waitForFirebaseCurrentUser(): Promise<FirebaseAuthTypes.User | null> {
  return new Promise(resolve => {
    const unsubscribe = auth().onAuthStateChanged(() => {
      unsubscribe();
      resolve(auth().currentUser);
    });
  });
}
