const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Strips password and other internal properties before sending to client.
 */
const toPublicUser = (user) => {
  if (!user) {
    return null;
  }

  const obj = typeof user.toObject === 'function' ? user.toObject() : { ...user };
  delete obj.password;
  delete obj.__v;
  return obj;
};

/**
 * Checks if a user exists by phone number.
 */
const checkUserExists = async (phoneNumber) => {
  const user = await User.findOne({ phoneNumber });
  return Boolean(user);
};

/**
 * Registers a new user.
 */
const registerUser = async ({ fullName, phoneNumber, email, password }) => {
  const existingUser = await User.findOne({ phoneNumber });

  if (existingUser) {
    const error = new Error('User already exists with this phone number.');
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    phoneNumber,
    email: email || '',
    password: hashedPassword,
  });

  return toPublicUser(user);
};

/**
 * Authenticates user credentials and generates a JWT.
 */
const loginUser = async ({ phoneNumber, password }) => {
  const user = await User.findOne({ phoneNumber });

  if (!user) {
    const error = new Error('User not found.');
    error.statusCode = 404;
    throw error;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    const error = new Error('Invalid credentials.');
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'resqgo_secret_key', {
    expiresIn: '7d',
  });

  return {
    user: toPublicUser(user),
    token,
  };
};

/**
 * Retrieves a user by MongoDB ObjectId.
 */
const getUserById = async (userId) => {
  const user = await User.findById(userId).select('-password');
  return toPublicUser(user);
};

module.exports = {
  toPublicUser,
  checkUserExists,
  registerUser,
  loginUser,
  getUserById,
};
