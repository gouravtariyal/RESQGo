import auth from '@react-native-firebase/auth';

/**
 * Starts Firebase phone authentication and returns the serializable verification ID.
 * Uses the React Native Firebase namespaced API (auth()) for reliable native binding.
 */
export async function sendPhoneOtp(phoneNumber: string): Promise<string> {
  const confirmation = await auth().signInWithPhoneNumber(phoneNumber);

  if (!confirmation.verificationId) {
    throw new Error('Firebase did not return a verification ID for this phone number.');
  }

  return confirmation.verificationId;
}

/**
 * Verifies an SMS code and signs the user in with the resulting phone credential.
 */
export async function verifyPhoneOtp(
  verificationId: string,
  otp: string,
): Promise<void> {
  const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
  await auth().signInWithCredential(credential);
}
