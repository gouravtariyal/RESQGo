const mongoose = require('mongoose');

/**
 * Connects to MongoDB with clear diagnostics on network/DNS failure.
 */
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  console.log(uri)

  if (!uri) {
    console.error('❌ MONGODB_URI is not defined in environment variables.');
    return false;
  }

  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB Connected successfully');
    return true;
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:');
    console.error(`   ${error.message}`);

    if (error.message.includes('querySrv ENOTFOUND')) {
      console.warn('\n⚠️  DNS / SRV Resolution Error:');
      console.warn('   The MongoDB cluster address in MONGODB_URI could not be resolved.');
      console.warn('   1. In MongoDB Atlas, check if the cluster is still active (free tier clusters pause after inactivity).');
      console.warn('   2. Verify the cluster hostname in backend/.env matches your Atlas "Connect" connection string.');
      console.warn('   3. If your local network/ISP blocks DNS SRV queries, check with 8.8.8.8 or use a non-SRV connection string.\n');
    }

    return false;
  }
};

module.exports = connectDB;