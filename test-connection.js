/**
 * 🔗 Database Connection Test Script
 * Tests MongoDB connection for ScholarBEE backend
 */

const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection string
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/scholarbee';

console.log('🔍 Testing MongoDB connection...');
console.log(`📍 Database: ${mongoUri.split('/').pop()}`);
console.log('⏳ Connecting...');

// Test connection
mongoose.connect(mongoUri)
  .then(() => {
    console.log('✅ MongoDB connected successfully!');
    console.log(`📍 Database: ${mongoUri.split('/').pop()}`);
    console.log('🌐 Connection ready for ScholarBEE');
    
    // Test basic operations
    return mongoose.connection.db.admin().ping();
  })
  .then(() => {
    console.log('🏓 Database ping successful');
    console.log('🎉 All tests passed! Database is ready.');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:');
    console.error(err.message);
    console.log('💡 Troubleshooting tips:');
    console.log('   1. Check if MongoDB is running');
    console.log('   2. Verify MONGODB_URI in .env file');
    console.log('   3. Check network connectivity');
    console.log('   4. Verify database credentials');
    process.exit(1);
  }); 