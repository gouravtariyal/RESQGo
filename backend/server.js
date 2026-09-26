require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 5000;
/** Bind IPv4 explicitly so Android emulator 10.0.2.2 can reach the host. */
const HOST = '0.0.0.0';

const startServer = async () => {
  try {
    const isDbConnected = await connectDB();

    if (!isDbConnected) {
      console.warn('⚠️  Server starting without active MongoDB connection.');
      console.warn('    Database operations will fail until valid MONGODB_URI is provided.\n');
    }

    app.listen(PORT, HOST, () => {
      console.log(`🚀 RESQGo Backend running on http://${HOST}:${PORT}`);
      console.log(`📡 Health check available at http://${HOST}:${PORT}/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:');
    console.error(error.message);
    process.exit(1);
  }
};

startServer();
