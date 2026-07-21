const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { fullName, phoneNumber, email, password } = req.body;

    if (!fullName || !phoneNumber || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields.',
      });
    }

    const existingUser = await User.findOne({ phoneNumber });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      phoneNumber,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and password are required.',
      });
    }

    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password.',
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports = {
  register,
  login,
};