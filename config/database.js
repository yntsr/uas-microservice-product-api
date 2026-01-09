const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

const initDatabase = async () => {
  try {
    // Test connection
    await prisma.$connect();
    console.log('Product database connected successfully');
    
    // Prisma will handle migrations, but we can verify the connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('Product database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

module.exports = { prisma, initDatabase };
