/**
 * One-time script to create the first admin account.
 * Usage: node src/scripts/createAdmin.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  const existing = await Admin.findOne({ email: 'admin@resqgo.com' });
  if (existing) {
    console.log('ℹ️  Admin already exists.');
    process.exit(0);
  }

  await Admin.create({
    name: 'Super Admin',
    email: 'admin@resqgo.com',
    password: 'Admin@12345',
    role: 'superadmin',
  });

  console.log('✅ Admin created: admin@resqgo.com / Admin@12345');
  console.log('⚠️  Change the password immediately after first login!');
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
