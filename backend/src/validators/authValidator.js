/**
 * Auth request validators.
 * Returns an error message string when invalid, otherwise null.
 */

const PHONE_REGEX = /^\+?[0-9]{10,15}$/;

/**
 * Validates the payload for register / login-by-phone flows.
 */
const validatePhoneAuth = (body = {}) => {
  const phoneNumber = String(body.phoneNumber || '').trim();
  const name = body.name != null ? String(body.name).trim() : undefined;

  if (!phoneNumber) {
    return 'phoneNumber is required';
  }

  if (!PHONE_REGEX.test(phoneNumber)) {
    return 'phoneNumber must be 10–15 digits (optional leading +)';
  }

  if (name !== undefined && name.length > 80) {
    return 'name must be 80 characters or fewer';
  }

  return null;
};

/**
 * Validates the payload for profile sync after Firebase OTP.
 */
const validateSyncAuth = (body = {}) => {
  const phoneError = validatePhoneAuth(body);
  if (phoneError) {
    return phoneError;
  }

  const firebaseUid = String(body.firebaseUid || '').trim();
  if (!firebaseUid) {
    return 'firebaseUid is required';
  }

  return null;
};

module.exports = {
  validatePhoneAuth,
  validateSyncAuth,
};
