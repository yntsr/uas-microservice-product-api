const express = require('express');
const router = express.Router();
const { prisma } = require('../config/database');

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json({
            success: true,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
        });
    }
});

// GET product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: error.message
        });
    }
});

// CREATE product
router.post('/', async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        
        if (!name || !price) {
            return res.status(400).json({
                success: false,
                message: 'Name and price are required'
            });
        }

        const product = await prisma.product.create({
            data: {
                name,
                description: description || '',
                price: parseFloat(price),
                stock: stock || 0
            }
        });

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating product',
            error: error.message
        });
    }
});

// UPDATE product
router.put('/:id', async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        const productId = parseInt(req.params.id);

        const existing = await prisma.product.findUnique({
            where: { id: productId }
        });
        
        if (!existing) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        const product = await prisma.product.update({
            where: { id: productId },
            data: {
                name: name || existing.name,
                description: description !== undefined ? description : existing.description,
                price: price ? parseFloat(price) : existing.price,
                stock: stock !== undefined ? stock : existing.stock
            }
        });

        res.json({
            success: true,
            message: 'Product updated successfully',
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error.message
        });
    }
});

// DELETE product
router.delete('/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        
        const existing = await prisma.product.findUnique({
            where: { id: productId }
        });
        
        if (!existing) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        await prisma.product.delete({
            where: { id: productId }
        });

        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error: error.message
        });
    }
});

// Update stock (used by order service)
router.patch('/:id/stock', async (req, res) => {
    try {
        const { quantity } = req.body;
        const productId = parseInt(req.params.id);

        const existing = await prisma.product.findUnique({
            where: { id: productId }
        });
        
        if (!existing) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        const newStock = existing.stock + quantity;
        if (newStock < 0) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock'
            });
        }

        const product = await prisma.product.update({
            where: { id: productId },
            data: { stock: newStock }
        });

        res.json({
            success: true,
            message: 'Stock updated successfully',
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating stock',
            error: error.message
        });
    }
});

module.exports = router;
