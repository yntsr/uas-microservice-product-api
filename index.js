const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { initDatabase, prisma } = require('./config/database');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'product-service' });
});

// Initialize database and start server
initDatabase()
    .then(() => {
        const server = app.listen(PORT, () => {
            console.log(`Product Service running on port ${PORT}`);
        });

        // Graceful shutdown
        process.on('SIGINT', async () => {
            console.log('Shutting down Product Service...');
            await prisma.$disconnect();
            server.close(() => {
                console.log('Product Service closed');
                process.exit(0);
            });
        });

        process.on('SIGTERM', async () => {
            console.log('Shutting down Product Service...');
            await prisma.$disconnect();
            server.close(() => {
                console.log('Product Service closed');
                process.exit(0);
            });
        });
    })
    .catch((error) => {
        console.error('Failed to start Product Service:', error);
        process.exit(1);
    });
