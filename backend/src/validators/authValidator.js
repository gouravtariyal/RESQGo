const validator = require('validator');
const { normalizePhoneNumber } = require('../utils/phone');

/**
 * Validates user registration payload.
 */
const validateRegisterInput = (body = {}) => {
  const errors = {};

  const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
  const phoneNumber = normalizePhoneNumber(body.phoneNumber);
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!fullName) {
    errors.fullName = 'Full name is required.';
  } else if (fullName.length < 2 || fullName.length > 80) {
    errors.fullName = 'Full name must be between 2 and 80 characters.';
  }

  if (!phoneNumber) {
    errors.phoneNumber = 'Phone number is required.';
  } else if (phoneNumber.length !== 10) {
    errors.phoneNumber = 'Please enter a valid 10-digit mobile number.';
  }

  if (email && !validator.isEmail(email)) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    values: {
      fullName,
      phoneNumber,
      email,
      password,
    },
  };
};

/**
 * Validates user login payload.
 */
const validateLoginInput = (body = {}) => {
  const errors = {};

  const phoneNumber = normalizePhoneNumber(body.phoneNumber);
  const password = typeof body.password === 'string' ? body.password : '';

  if (!phoneNumber) {
    errors.phoneNumber = 'Phone number is required.';
  }

  if (!password) {
    errors.password = 'Password is required.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    values: {
      phoneNumber,
      password,
    },
  };
};

/**
 * Validates check-user payload.
 */
const validateCheckUserInput = (body = {}) => {
  const errors = {};
  const phoneNumber = normalizePhoneNumber(body.phoneNumber);

  if (!phoneNumber) {
    errors.phoneNumber = 'Phone number is required.';
  } else if (phoneNumber.length !== 10) {
    errors.phoneNumber = 'Please enter a valid 10-digit mobile number.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    values: {
      phoneNumber,
    },
  };
};

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  validateCheckUserInput,
};
