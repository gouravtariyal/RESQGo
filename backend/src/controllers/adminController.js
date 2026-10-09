const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');

/**
 * POST /api/admin/login
 * Authenticates an admin and returns a JWT.
 */
const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    const isValid = admin ? await admin.comparePassword(password) : false;

    if (!admin || !isValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Contact a superadmin.',
      });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role, type: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/admin/me
 * Returns the currently authenticated admin profile.
 */
const adminGetMe = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      admin: req.admin,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/admin/stats
 * Returns live operational stats for the admin dashboard.
 */
const adminGetStats = async (req, res, next) => {
  try {
    const [totalUsers, verifiedUsers, blockedUsers, recentUsers] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isVerified: true }),
      User.countDocuments({ isBlocked: true }),
      User.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      }),
    ]);

    const activeUsers = Math.max(0, totalUsers - blockedUsers);

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        verifiedUsers,
        blockedUsers,
        activeUsers,
        recentUsers,
        activeEmergencies: 0,
        respondersOnline: 0,
        avgResponseTimeMinutes: null,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/admin/analytics/onboarding
 * Returns user onboarding time-series data for chart visualization.
 * Query params: range = '7d' | '14d' | '30d' | '90d' | '1y' (default: '30d')
 */
const adminGetOnboardingAnalytics = async (req, res, next) => {
  try {
    const range = (req.query.range || '30d').toLowerCase();

    const now = new Date();
    let startDate = new Date();
    let isMonthly = false;
    let daysCount = 30;

    switch (range) {
      case '7d':
        daysCount = 7;
        startDate.setDate(now.getDate() - 6);
        startDate.setHours(0, 0, 0, 0);
        break;
      case '14d':
        daysCount = 14;
        startDate.setDate(now.getDate() - 13);
        startDate.setHours(0, 0, 0, 0);
        break;
      case '90d':
        daysCount = 90;
        startDate.setDate(now.getDate() - 89);
        startDate.setHours(0, 0, 0, 0);
        break;
      case '1y':
        isMonthly = true;
        startDate = new Date(now.getFullYear(), now.getMonth() - 11, 1, 0, 0, 0, 0);
        break;
      case '30d':
      default:
        daysCount = 30;
        startDate.setDate(now.getDate() - 29);
        startDate.setHours(0, 0, 0, 0);
        break;
    }

    const formatString = isMonthly ? '%Y-%m' : '%Y-%m-%d';

    const [aggregatedUsers, totalUsersAllTime, blockedCount, verifiedCount] = await Promise.all([
      User.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: formatString, date: '$createdAt' } },
            count: { $sum: 1 },
            verified: {
              $sum: { $cond: [{ $eq: ['$isVerified', true] }, 1, 0] },
            },
            blocked: {
              $sum: { $cond: [{ $eq: ['$isBlocked', true] }, 1, 0] },
            },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      User.countDocuments(),
      User.countDocuments({ isBlocked: true }),
      User.countDocuments({ isVerified: true }),
    ]);

    const dateMap = new Map();
    aggregatedUsers.forEach(item => {
      dateMap.set(item._id, item);
    });

    const series = [];
    let runningTotal = 0;

    if (isMonthly) {
      for (let i = 11; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const item = dateMap.get(key) || { count: 0, verified: 0, blocked: 0 };
        runningTotal += item.count;

        series.push({
          date: key,
          label: d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
          count: item.count,
          verified: item.verified,
          blocked: item.blocked,
          cumulative: runningTotal,
        });
      }
    } else {
      for (let i = daysCount - 1; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(now.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        const item = dateMap.get(key) || { count: 0, verified: 0, blocked: 0 };
        runningTotal += item.count;

        series.push({
          date: key,
          label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
          count: item.count,
          verified: item.verified,
          blocked: item.blocked,
          cumulative: runningTotal,
        });
      }
    }

    const totalInPeriod = series.reduce((acc, curr) => acc + curr.count, 0);
    const verifiedInPeriod = series.reduce((acc, curr) => acc + curr.verified, 0);
    const blockedInPeriod = series.reduce((acc, curr) => acc + curr.blocked, 0);
    const maxDay = series.reduce(
      (max, curr) => (curr.count > max.count ? curr : max),
      { count: 0, label: 'N/A', date: '' }
    );
    const divisor = isMonthly ? 12 : daysCount;
    const dailyAverage = divisor > 0 ? (totalInPeriod / divisor).toFixed(1) : '0';

    return res.status(200).json({
      success: true,
      range,
      data: series,
      summary: {
        totalInPeriod,
        verifiedInPeriod,
        blockedInPeriod,
        totalUsersAllTime,
        blockedUsersTotal: blockedCount,
        verifiedUsersTotal: verifiedCount,
        dailyAverage: Number(dailyAverage),
        peakCount: maxDay.count,
        peakDate: maxDay.label,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/admin/users
 * Returns all registered users (paginated, sorted by newest first, with optional status/search filters).
 */
const adminGetUsers = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 50);
    const skip = (page - 1) * limit;
    const { status, search } = req.query;

    const filter = {};

    if (status === 'blocked') {
      filter.isBlocked = true;
    } else if (status === 'active') {
      filter.isBlocked = { $ne: true };
    } else if (status === 'verified') {
      filter.isVerified = true;
    } else if (status === 'unverified') {
      filter.isVerified = false;
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      filter.$or = [{ fullName: regex }, { phoneNumber: regex }, { email: regex }];
    }

    const [users, total] = await Promise.all([
      User.find(filter).select('-password -__v').sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      users,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/admin/users/:id/block
 * Blocks or unblocks a user account and records reason and timestamp.
 */
const adminToggleBlockUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isBlocked, reason } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    const nextBlockedState = typeof isBlocked === 'boolean' ? isBlocked : !user.isBlocked;

    user.isBlocked = nextBlockedState;
    user.blockedAt = nextBlockedState ? new Date() : null;
    user.blockedReason = nextBlockedState
      ? (typeof reason === 'string' && reason.trim() ? reason.trim() : 'Blocked by administrator')
      : '';

    await user.save();

    const publicUser = user.toObject();
    delete publicUser.password;
    delete publicUser.__v;

    return res.status(200).json({
      success: true,
      message: nextBlockedState ? 'User has been blocked successfully.' : 'User has been unblocked successfully.',
      user: publicUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  adminLogin,
  adminGetMe,
  adminGetStats,
  adminGetOnboardingAnalytics,
  adminGetUsers,
  adminToggleBlockUser,
};
