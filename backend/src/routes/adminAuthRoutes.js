const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const {
  adminLogin,
  adminGetMe,
  adminGetStats,
  adminGetOnboardingAnalytics,
  adminGetUsers,
  adminToggleBlockUser,
} = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/adminMiddleware');

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts. Please try again later.' },
});

router.post('/login', adminLimiter, adminLogin);
router.get('/me', authenticateAdmin, adminGetMe);
router.get('/stats', authenticateAdmin, adminGetStats);
router.get('/analytics/onboarding', authenticateAdmin, adminGetOnboardingAnalytics);
router.get('/users', authenticateAdmin, adminGetUsers);
router.patch('/users/:id/block', authenticateAdmin, adminToggleBlockUser);

module.exports = router;
