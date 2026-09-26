const authService = require('../services/authService');
const {
  validateRegisterInput,
  validateLoginInput,
  validateCheckUserInput,
} = require('../validators/authValidator');

/**
 * Register a new user account.
 */
const register = async (req, res, next) => {
  try {
    const { isValid, errors, values } = validateRegisterInput(req.body);

    if (!isValid) {
      const firstErrorMessage = Object.values(errors)[0];
      return res.status(400).json({
        success: false,
        message: firstErrorMessage || 'Please provide valid input fields.',
        errors,
      });
    }

    const user = await authService.registerUser(values);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      user,
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};

/**
 * Log in an existing user with phone and password.
 */
const login = async (req, res, next) => {
  try {
    const { isValid, errors, values } = validateLoginInput(req.body);

    if (!isValid) {
      const firstErrorMessage = Object.values(errors)[0];
      return res.status(400).json({
        success: false,
        message: firstErrorMessage || 'Please enter both phone number and password.',
        errors,
      });
    }

    const { user, token } = await authService.loginUser(values);

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user,
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};

/**
 * Check if a user exists by phone number.
 */
const checkUser = async (req, res, next) => {
  try {
    const { isValid, errors, values } = validateCheckUserInput(req.body);

    if (!isValid) {
      const firstErrorMessage = Object.values(errors)[0];
      return res.status(400).json({
        success: false,
        message: firstErrorMessage || 'Phone number is required.',
        errors,
      });
    }

    const exists = await authService.checkUserExists(values.phoneNumber);

    return res.status(200).json({
      success: true,
      exists,
      message: exists ? 'User already exists.' : 'User not found.',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Returns current authenticated user profile.
 */
const getMe = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  checkUser,
  getMe,
};
