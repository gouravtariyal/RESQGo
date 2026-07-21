const User = require('../models/User');

/**
 * Finds an existing user by phone or creates a new one.
 */
const findOrCreateByPhone = async ({ phoneNumber, name, firebaseUid }) => {
  const normalizedPhone = String(phoneNumber).trim();

  let user = await User.findOne({ phoneNumber: normalizedPhone });

  if (user) {
    const updates = {};

    if (name && name !== user.name) {
      updates.name = name;
    }

    if (firebaseUid && firebaseUid !== user.firebaseUid) {
      updates.firebaseUid = firebaseUid;
    }

    if (Object.keys(updates).length > 0) {
      user = await User.findByIdAndUpdate(user._id, updates, {
        new: true,
        runValidators: true,
      });
    }

    return { user, created: false };
  }

  user = await User.create({
    phoneNumber: normalizedPhone,
    name: name || '',
    firebaseUid: firebaseUid || null,
  });

  return { user, created: true };
};

/**
 * Returns a user by Mongo id.
 */
const getUserById = async (userId) => {
  return User.findById(userId);
};

/**
 * Returns a user by phone number.
 */
const getUserByPhone = async (phoneNumber) => {
  return User.findOne({ phoneNumber: String(phoneNumber).trim() });
};

module.exports = {
  findOrCreateByPhone,
  getUserById,
  getUserByPhone,
};
